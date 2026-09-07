/**
 * Client-side media file validation.
 *
 * NOTE: this is a UX aid only. The backend remains the authoritative
 * validator for file type, size and signature. Any request still goes to the
 * backend, which re-validates everything.
 */

export const IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
] as const;

export const VIDEO_MIME_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/ogg',
] as const;

export const IMAGE_MAX_BYTES = 10 * 1024 * 1024; // 10 MiB
export const VIDEO_MAX_BYTES = 100 * 1024 * 1024; // 100 MiB

export type MediaKind = 'image' | 'video';

export interface MediaValidationResult {
  valid: boolean;
  error?: string;
}

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'];
const VIDEO_EXTENSIONS = ['mp4', 'webm', 'mov', 'ogv', 'ogg'];

const extensionOf = (name: string): string => {
  const parts = name.toLowerCase().split('.');
  return parts.length > 1 ? parts[parts.length - 1] : '';
};

/** Human readable "10 MiB" / "100 MiB" style size label. */
export const maxSizeLabel = (kind: MediaKind): string => {
  const bytes = kind === 'image' ? IMAGE_MAX_BYTES : VIDEO_MAX_BYTES;
  return `${Math.round(bytes / (1024 * 1024))} MiB`;
};

/** Formats a byte count as a human readable string (e.g. "12.4 MB"). */
export function formatBytes(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes) || bytes < 0) return '';
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value >= 100 || index === 0 ? Math.round(value) : value.toFixed(1)} ${units[index]}`;
}

export const acceptedExtensionsLabel = (kind: MediaKind): string =>
  kind === 'image' ? 'JPG · PNG · GIF · WebP · AVIF' : 'MP4 · WebM · MOV · OGV';

export function validateMediaFile(file: File, kind: MediaKind): MediaValidationResult {
  const maxBytes = kind === 'image' ? IMAGE_MAX_BYTES : VIDEO_MAX_BYTES;
  const allowedMime = kind === 'image' ? IMAGE_MIME_TYPES : VIDEO_MIME_TYPES;
  const allowedExtensions = kind === 'image' ? IMAGE_EXTENSIONS : VIDEO_EXTENSIONS;

  const mime = (file.type || '').toLowerCase();
  const extension = extensionOf(file.name);
  const mimeAllowed = mime.length > 0 ? (allowedMime as readonly string[]).includes(mime) : undefined;
  const extensionAllowed = extension.length > 0 ? allowedExtensions.includes(extension) : undefined;

  const allowed = mimeAllowed === undefined
    ? extensionAllowed === true
    : extensionAllowed === undefined
      ? mimeAllowed
      : mimeAllowed || extensionAllowed;

  if (!allowed) {
    const label = kind === 'image'
      ? 'an image (JPG, PNG, GIF, WebP, or AVIF)'
      : 'a video (MP4, WebM, MOV, or OGV)';
    return { valid: false, error: `"${file.name}" is not ${label}.` };
  }

  if (file.size > maxBytes) {
    return {
      valid: false,
      error: `"${file.name}" is ${formatBytes(file.size)} — the maximum size for ${kind === 'image' ? 'images' : 'videos'} is ${maxSizeLabel(kind)}.`,
    };
  }

  if (file.size === 0) {
    return { valid: false, error: `"${file.name}" is empty.` };
  }

  return { valid: true };
}
