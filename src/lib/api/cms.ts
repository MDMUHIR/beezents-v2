/**
 * CMS entity payload builders for the combined entity + media upload API.
 *
 * Every save of a Project / Solution / Case Study goes to the matching
 * `/api/v1/admin/{resource}[/{id}]/upload` endpoint as a single multipart
 * request whose `payload` field is a JSON string. Files ride along in the
 * dedicated file fields (cover_file, image_file, demo_video_file).
 *
 * Entity JSON fields follow the backend schemas; media semantics follow the
 * documented backend behavior:
 *
 *   File present        -> new file wins over *_media_id
 *   *_media_id supplied -> link that media
 *   Neither supplied    -> existing media unchanged
 *
 * The builders therefore only emit media fields when the admin explicitly
 * removed or switched media. Untouched media stays out of the payload so a
 * partial PATCH cannot accidentally unlink it.
 */

import type {
  CaseStudy,
  Project,
  Solution,
} from '../../types';

export type EntityKind = 'project' | 'solution' | 'case-study';

const RESOURCE_BY_KIND: Record<EntityKind, string> = {
  project: 'projects',
  solution: 'solutions',
  'case-study': 'case-studies',
};

/** Upload path for a kind; POST when id is null, PATCH otherwise. */
export function cmsUploadPath(kind: EntityKind, id?: string | null): string {
  const resource = RESOURCE_BY_KIND[kind];
  return id
    ? `/api/v1/admin/${resource}/${encodeURIComponent(id)}/upload`
    : `/api/v1/admin/${resource}/upload`;
}

/** Multipart file field names used by the backend contract. */
export const CMS_FILE_FIELDS = {
  cover: 'cover_file',
  image: 'image_file',
  demoVideo: 'demo_video_file',
} as const;

export type DemoVideoType = 'upload' | 'youtube' | null;

/**
 * What the admin did with an entity image (cover image, solution image,
 * case-study image). `replace` only applies when a file is actually attached
 * to the request; no payload key is emitted because the file wins.
 */
export type EntityImageDelta = 'keep' | 'replace' | 'remove';

/**
 * What the admin did with the demo video. Exactly one of the payload shapes
 * may end up in the request:
 *
 *   keep    -> no demo video fields (existing media unchanged)
 *   file    -> demo_video_file attached; demo_video_type = "upload"
 *   youtube -> demo_video_url + demo_video_type = "youtube"; media id cleared
 *   remove  -> media id, url and type cleared
 *
 * Uploaded files and YouTube links are mutually exclusive: sending a YouTube
 * URL while a file is attached is never possible from these builders.
 */
export type DemoVideoDelta =
  | { action: 'keep' }
  | { action: 'file' }
  | { action: 'remove' }
  | { action: 'youtube'; url: string };

export interface ProjectSaveInput {
  data: Partial<Project>;
  isCreate?: boolean;
  cover?: EntityImageDelta;
  demoVideo?: DemoVideoDelta;
}

export interface SolutionSaveInput {
  data: Partial<Solution>;
  isCreate?: boolean;
  image?: EntityImageDelta;
  demoVideo?: DemoVideoDelta;
}

export interface CaseStudySaveInput {
  data: Partial<CaseStudy>;
  isCreate?: boolean;
  /** Raw `results` (string outcomes) not represented on the local type. */
  results?: string[];
  image?: EntityImageDelta;
}

const remoteIds = (ids: string[] | undefined): string[] =>
  (ids || []).filter((id) => id && !id.startsWith('local-'));

const applyCoverDelta = (payload: Record<string, unknown>, delta: EntityImageDelta): void => {
  if (delta === 'remove') {
    payload.cover_media_id = null;
    payload.cover_image = null;
  }
};

const applyImageDelta = (payload: Record<string, unknown>, delta: EntityImageDelta): void => {
  if (delta === 'remove') {
    payload.image_media_id = null;
    payload.image_url = null;
  }
};

const applyDemoVideoDelta = (payload: Record<string, unknown>, delta?: DemoVideoDelta): void => {
  if (!delta || delta.action === 'keep') return;
  switch (delta.action) {
    case 'file':
      payload.demo_video_type = 'upload';
      break;
    case 'youtube':
      payload.demo_video_url = delta.url;
      payload.demo_video_type = 'youtube';
      payload.demo_video_media_id = null;
      break;
    case 'remove':
      payload.demo_video_media_id = null;
      payload.demo_video_url = null;
      payload.demo_video_type = null;
      break;
  }
};

/** JSON payload placed inside the `payload` multipart field for Projects. */
export function buildProjectPayload(input: ProjectSaveInput): Record<string, unknown> {
  const { data, isCreate = false } = input;
  const payload: Record<string, unknown> = {
    title: data.title,
    slug: data.slug,
    short_description: data.shortDescription ?? data.overview ?? '',
    description: data.fullDescription ?? data.overview ?? '',
    client_name: data.clientName || data.client || '',
    industry: data.industry ?? '',
    category_ids: remoteIds(
      data.categoryIds ??
        data.categories?.map((category) => category.id) ??
        (data.categoryId && !String(data.categoryId).startsWith('local-') ? [data.categoryId] : undefined),
    ),
    project_type: data.projectType || (isCreate ? 'Other' : ''),
    technologies: data.technologies ?? [],
    results: data.results ?? [],
    featured: Boolean(data.featured),
    published: data.status === 'PUBLISHED',
  };

  if (isCreate) payload.status = 'active';
  if (data.liveUrl !== undefined) payload.live_url = data.liveUrl ?? '';
  if (data.githubUrl !== undefined) payload.github_url = data.githubUrl ?? '';

  applyCoverDelta(payload, input.cover ?? 'keep');
  applyDemoVideoDelta(payload, input.demoVideo);
  return payload;
}

/** JSON payload placed inside the `payload` multipart field for Solutions. */
export function buildSolutionPayload(input: SolutionSaveInput): Record<string, unknown> {
  const { data, isCreate = false } = input;
  const payload: Record<string, unknown> = {
    name: data.title,
    slug: data.slug,
    short_description: data.shortDescription ?? '',
    description: data.description ?? data.fullDescription ?? '',
    category_ids: remoteIds(
      data.categoryIds ??
        data.categories?.map((category) => category.id) ??
        (data.categoryId && !String(data.categoryId).startsWith('local-') ? [data.categoryId] : []),
    ),
    featured: Boolean(data.featured),
    published: data.status === 'PUBLISHED',
  };

  if (data.sortOrder !== undefined) payload.sort_order = data.sortOrder;
  else if (isCreate) payload.sort_order = 0;
  if (data.icon) payload.icon = data.icon;

  applyImageDelta(payload, input.image ?? 'keep');
  applyDemoVideoDelta(payload, input.demoVideo);
  return payload;
}

/** JSON payload placed inside the `payload` multipart field for Case Studies. */
export function buildCaseStudyPayload(input: CaseStudySaveInput): Record<string, unknown> {
  const { data, results } = input;
  const payload: Record<string, unknown> = {
    title: data.title,
    slug: data.slug,
    project_id: data.relatedProjectId ?? null,
    summary: data.summary ?? '',
    challenge: data.challenge ?? '',
    solution: data.solution ?? '',
    implementation: data.implementation ?? '',
    results: results ?? [],
    technologies: data.technologies ?? [],
    metrics: data.measurableResults ?? [],
    featured: Boolean(data.featured),
    published: data.status === 'PUBLISHED',
  };

  if (data.seoTitle) payload.seo_title = data.seoTitle;
  if (data.seoDescription) payload.seo_description = data.seoDescription;

  applyImageDelta(payload, input.image ?? 'keep');
  return payload;
}
