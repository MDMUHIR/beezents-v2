import React from 'react';
import { parseYouTubeUrl } from '../../lib/media/youtube';

export interface DemoVideoEmbedProps {
  /** demo_video_url — a media URL (upload mode) or a YouTube URL. */
  url?: string | null;
  /** demo_video_type — 'youtube' or 'upload' (null treated as upload). */
  type?: 'youtube' | 'upload' | null;
  /** Used in the accessible title of the embedded player. */
  title?: string;
}

/**
 * Renders an entity demo video on public pages.
 *
 * YouTube URLs are parsed to a canonical video id first and the iframe is
 * always built from that parsed id — raw user input can never become an
 * iframe src. Media URLs are rendered through a native <video> element.
 */
export const DemoVideoEmbed: React.FC<DemoVideoEmbedProps> = ({ url, type, title = 'Demo video' }) => {
  if (!url) return null;

  if (type === 'youtube') {
    const parsed = parseYouTubeUrl(url);
    if (!parsed.valid || !parsed.embedUrl) return null;
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-xs">
        <iframe
          src={parsed.embedUrl}
          title={`${title} (YouTube)`}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-xs">
      <video
        src={url}
        controls
        preload="metadata"
        className="aspect-video w-full bg-black object-contain"
      />
    </div>
  );
};