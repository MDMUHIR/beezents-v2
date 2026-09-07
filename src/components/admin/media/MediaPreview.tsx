import React from 'react';
import { formatBytes } from '../../../lib/media/validation';

export interface MediaPreviewProps {
  mediaType: 'image' | 'video' | 'youtube';
  /** Image/video src, or the safe YouTube embed URL for `youtube`. */
  src: string;
  fileName?: string | null;
  fileSize?: number | null;
  meta?: string | null;
  alt?: string;
  actions?: React.ReactNode;
  /** Rendered in the corner of the preview box (e.g. a "NEW" badge). */
  badge?: React.ReactNode;
}

/**
 * Presentational preview box for images, local videos and YouTube embeds.
 * All preview URLs must already be safe (object URLs or embed URLs derived
 * from a parsed YouTube video id); this component never receives raw input.
 */
export const MediaPreview: React.FC<MediaPreviewProps> = ({
  mediaType,
  src,
  fileName,
  fileSize,
  meta,
  alt = 'Media preview',
  actions,
  badge,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-black/5">
        {mediaType === 'image' && (
          <img
            src={src}
            alt={alt}
            className="h-52 w-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        {mediaType === 'video' && (
          <video
            src={src}
            controls
            preload="metadata"
            className="h-52 w-full bg-black object-contain"
          />
        )}
        {mediaType === 'youtube' && (
          <div className="relative h-52 w-full bg-black">
            <iframe
              src={src}
              title="YouTube video preview"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
            />
          </div>
        )}
        {badge && (
          <span className="absolute top-2 left-2 rounded-md bg-[#0282EB] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-xs">
            {badge}
          </span>
        )}
      </div>

      {(fileName || fileSize !== null || meta) && (
        <div className="flex items-center justify-between gap-3 text-[11px]">
          <div className="min-w-0">
            {fileName && <div className="truncate font-semibold text-slate-700">{fileName}</div>}
            <div className="text-slate-400">
              {fileSize !== null && fileSize !== undefined ? formatBytes(fileSize) : ''}
              {meta ? ` · ${meta}` : ''}
            </div>
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}

      {!fileName && fileSize === null && !meta && actions && (
        <div className="flex items-center justify-end gap-2">{actions}</div>
      )}
    </div>
  );
};