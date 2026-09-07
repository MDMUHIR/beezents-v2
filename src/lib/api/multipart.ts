/**
 * Multipart request construction for the combined entity + media upload API.
 *
 * The backend contract expects:
 *   - `payload`  -> a JSON string of the entity fields
 *   - file fields (cover_file, image_file, demo_video_file) -> actual files
 *
 * The browser must generate the multipart boundary itself, so we never set a
 * `Content-Type` header here.
 */

export type FileEntryMap = Record<string, File | Blob | null | undefined>;

/**
 * Builds the FormData body for any of the combined `/upload` endpoints.
 *
 *   buildEntityFormData(
 *     { title: 'x', slug: 'x' },
 *     { cover_file: fileOrNull, demo_video_file: videoOrNull }
 *   )
 */
export function buildEntityFormData(payload: unknown, files?: FileEntryMap | null): FormData {
  const formData = new FormData();
  formData.append('payload', JSON.stringify(payload ?? {}));

  if (files) {
    for (const [fieldName, file] of Object.entries(files)) {
      if (file) formData.append(fieldName, file);
    }
  }

  return formData;
}

/** True when at least one real file will be attached to the request. */
export function hasFiles(files?: FileEntryMap | null): boolean {
  if (!files) return false;
  return Object.values(files).some((file) => file instanceof File && file.size > 0);
}

export interface UploadProgress {
  /** Fraction between 0 and 1. Undefined until the browser reports a total. */
  fraction: number | null;
  loaded: number;
  total: number | null;
}
