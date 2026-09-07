/**
 * YouTube URL parsing and normalization helpers.
 *
 * Accepts common YouTube link formats (watch, share, shorts, embeds) and
 * returns the canonical 11-character video id. The id is the only thing the
 * UI ever trusts to build preview/embed URLs, so arbitrary input can never
 * become an iframe source.
 */

export interface YouTubeUrlResult {
  valid: boolean;
  videoId?: string;
  /** Canonical URL: https://www.youtube.com/watch?v=<id> */
  normalizedUrl?: string;
  /** Safe embed URL derived from the parsed id only. */
  embedUrl?: string;
  reason?: 'empty' | 'invalid' | 'no-id';
}

const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be']);
const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/**
 * Parses a user-provided YouTube URL.
 *
 * Supports:
 *   https://www.youtube.com/watch?v=VIDEO_ID
 *   https://youtu.be/VIDEO_ID
 *   https://www.youtube.com/shorts/VIDEO_ID
 *   https://www.youtube.com/embed/VIDEO_ID
 *   https://www.youtube.com/live/VIDEO_ID
 *   (with or without protocol and extra query params)
 */
export function parseYouTubeUrl(input: string): YouTubeUrlResult {
  const raw = (input || '').trim();
  if (!raw) return { valid: false, reason: 'empty' };

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { valid: false, reason: 'invalid' };
  }

  const host = url.hostname.toLowerCase();
  if (!YOUTUBE_HOSTS.has(host)) return { valid: false, reason: 'invalid' };

  let videoId = '';

  if (host === 'youtu.be') {
    videoId = url.pathname.replace(/^\//, '').split('/')[0] || '';
  } else {
    const path = url.pathname;
    if (path === '/watch' || path === '/watch/') {
      videoId = url.searchParams.get('v') || '';
    } else if (path.startsWith('/shorts/')) {
      videoId = path.replace('/shorts/', '').split('/')[0] || '';
    } else if (path.startsWith('/embed/')) {
      videoId = path.replace('/embed/', '').split('/')[0] || '';
    } else if (path.startsWith('/live/')) {
      videoId = path.replace('/live/', '').split('/')[0] || '';
    }
  }

  if (!videoId || !VIDEO_ID_PATTERN.test(videoId)) {
    return { valid: false, reason: 'no-id' };
  }

  const normalizedUrl = `https://www.youtube.com/watch?v=${videoId}`;
  return {
    valid: true,
    videoId,
    normalizedUrl,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  };
}

export function isYouTubeUrl(input: string): boolean {
  return parseYouTubeUrl(input).valid;
}

export function youTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}