import React from 'react';
import { CheckCircle2, AlertCircle, Youtube } from 'lucide-react';
import { parseYouTubeUrl } from '../../../lib/media/youtube';
import { MediaPreview } from './MediaPreview';

export interface YouTubeInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * YouTube link input with live parsing and a safe embed preview. The preview
 * is always built from the parsed 11-character video id, never from raw
 * user input.
 */
export const YouTubeInput: React.FC<YouTubeInputProps> = ({ id, value, onChange, disabled = false }) => {
  const result = parseYouTubeUrl(value);

  return (
    <div className="space-y-2">
      <div>
        <label htmlFor={id} className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
          YouTube Video URL
        </label>
        <input
          id={id}
          type="text"
          inputMode="url"
          placeholder="https://www.youtube.com/watch?v=..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          aria-invalid={value.length > 0 && !result.valid}
          aria-describedby={value.length > 0 && !result.valid ? `${id}-error` : `${id}-valid`}
          className={`w-full px-3 py-2 rounded-xl border text-xs bg-white focus:outline-none ${
            value.length > 0 && !result.valid
              ? 'border-red-400 focus:border-red-500'
              : 'border-slate-200 focus:border-[#0282EB]'
          }`}
        />
      </div>

      {value.length > 0 && !result.valid && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-[11px] font-medium text-red-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Enter a valid YouTube link (youtube.com/watch, youtu.be, or youtube.com/shorts).
        </p>
      )}

      {value.length > 0 && result.valid && (
        <>
          <p id={`${id}-valid`} className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            Valid YouTube URL · video id {result.videoId}
          </p>
          <MediaPreview
            mediaType="youtube"
            src={result.embedUrl}
            meta="YouTube preview"
            badge={<Youtube className="h-3 w-3" aria-hidden="true" />}
          />
        </>
      )}

      {value.length === 0 && (
        <p className="text-[11px] text-slate-400">
          Accepts youtube.com/watch, youtu.be and youtube.com/shorts links.
        </p>
      )}
    </div>
  );
};