import React, { useState } from 'react';
import { Trash2, Undo2, Video, Link2 } from 'lucide-react';
import { FileDropzone } from './FileDropzone';
import { MediaPreview } from './MediaPreview';
import { YouTubeInput } from './YouTubeInput';
import { validateMediaFile } from '../../../lib/media/validation';
import { useObjectUrl } from '../../../lib/media/preview';

export type DemoVideoMode = 'upload' | 'youtube' | null;

export interface DemoVideoValue {
  /** Which source pane is active. `null` until the admin picks one. */
  mode: DemoVideoMode;
  /** Validated uploaded video file (upload mode only). */
  file: File | null;
  /** YouTube URL text (youtube mode only). */
  youtubeUrl: string;
  /** True when the existing uploaded video should be removed on save. */
  removed: boolean;
}

export interface ExistingDemoVideo {
  type?: 'upload' | 'youtube' | null;
  /** URL of the existing uploaded video (upload mode). */
  mediaUrl?: string | null;
  /** Existing YouTube URL (youtube mode). */
  youtubeUrl?: string | null;
}

export interface VideoUploadProps {
  id: string;
  label?: string;
  existing?: ExistingDemoVideo | null;
  value: DemoVideoValue;
  onChange: (value: DemoVideoValue) => void;
  /** External (submit/backend) error message. */
  error?: string | null;
  disabled?: boolean;
}

const emptyValue = (): DemoVideoValue => ({ mode: null, file: null, youtubeUrl: '', removed: false });

/**
 * Reusable demo-video field used by Projects and Solutions. Renders a clear
 * segmented control between an uploaded video and a YouTube link. Uploaded
 * videos and YouTube URLs are mutually exclusive: switching source clears the
 * other side.
 */
export const VideoUpload: React.FC<VideoUploadProps> = ({
  id,
  label = 'Demo Video',
  existing = null,
  value,
  onChange,
  error = null,
  disabled = false,
}) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const objectUrl = useObjectUrl(value.file);

  const hasExistingUpload = Boolean(existing && existing.type !== 'youtube' && existing.mediaUrl);
  const hasExistingYouTube = Boolean(existing && existing.type === 'youtube' && existing.youtubeUrl);

  const selectMode = (mode: 'upload' | 'youtube') => {
    setFileError(null);
    if (mode === 'upload') {
      onChange({
        mode: 'upload',
        file: null,
        youtubeUrl: '',
        removed: false,
      });
    } else {
      onChange({
        mode: 'youtube',
        file: null,
        youtubeUrl: hasExistingYouTube ? (existing?.youtubeUrl as string) : '',
        removed: false,
      });
    }
  };

  const selectFile = (file: File) => {
    setFileError(null);
    const result = validateMediaFile(file, 'video');
    if (!result.valid) {
      setFileError(result.error);
      return;
    }
    onChange({ mode: 'upload', file, youtubeUrl: '', removed: false });
  };

  const clearFile = () => {
    onChange({ mode: 'upload', file: null, youtubeUrl: '', removed: false });
  };

  const removeExistingVideo = () => {
    setFileError(null);
    onChange({ mode: value.mode ?? 'upload', file: null, youtubeUrl: '', removed: true });
  };

  const undoRemove = () => {
    if (value.mode === 'youtube') {
      onChange({
        mode: 'youtube',
        file: null,
        youtubeUrl: hasExistingYouTube ? (existing?.youtubeUrl as string) : '',
        removed: false,
      });
    } else {
      onChange({ mode: 'upload', file: null, youtubeUrl: '', removed: false });
    }
  };

  const message = error || fileError;

  return (
    <div className="space-y-2">
      <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">{label}</span>

      {/* Source segmented control */}
      <div
        role="radiogroup"
        aria-label="Choose video source"
        className="grid grid-cols-2 gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1"
      >
        <button
          type="button"
          role="radio"
          aria-checked={value.mode === 'upload'}
          disabled={disabled}
          onClick={() => selectMode('upload')}
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
            value.mode === 'upload'
              ? 'bg-white text-[#0282EB] shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Video className="h-4 w-4" aria-hidden="true" />
          Upload Video
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={value.mode === 'youtube'}
          disabled={disabled}
          onClick={() => selectMode('youtube')}
          className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
            value.mode === 'youtube'
              ? 'bg-white text-[#0282EB] shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Link2 className="h-4 w-4" aria-hidden="true" />
          YouTube Link
        </button>
      </div>

      {value.mode === 'upload' && (
        <div className="space-y-2">
          {value.file ? (
            <MediaPreview
              mediaType="video"
              src={objectUrl || ''}
              fileName={value.file.name}
              fileSize={value.file.size}
              badge="Selected"
              actions={
                <>
                  {hasExistingUpload && (
                    <button
                      type="button"
                      onClick={removeExistingVideo}
                      disabled={disabled}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Remove existing
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={clearFile}
                    disabled={disabled}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Clear
                  </button>
                </>
              }
            />
          ) : value.removed ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-amber-800">
                  The current demo video will be removed when you save.
                </p>
                <button
                  type="button"
                  onClick={undoRemove}
                  disabled={disabled}
                  className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-amber-700 hover:bg-amber-100"
                >
                  <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Undo
                </button>
              </div>
              <FileDropzone id={`${id}-video`} kind="video" onFile={selectFile} disabled={disabled} compact />
            </div>
          ) : hasExistingUpload ? (
            <>
              <MediaPreview
                mediaType="video"
                src={existing?.mediaUrl as string}
                meta="Current demo video"
                actions={
                  <button
                    type="button"
                    onClick={removeExistingVideo}
                    disabled={disabled}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Remove
                  </button>
                }
              />
              <FileDropzone
                id={`${id}-video`}
                kind="video"
                onFile={selectFile}
                disabled={disabled}
                compact
                title="Replace with a new video"
              />
            </>
          ) : (
            <FileDropzone id={`${id}-video`} kind="video" onFile={selectFile} disabled={disabled} />
          )}
        </div>
      )}

      {value.mode === 'youtube' && (
        <div className="space-y-2">
          {value.removed ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-amber-800">
                  The current YouTube video will be removed when you save.
                </p>
                <button
                  type="button"
                  onClick={undoRemove}
                  disabled={disabled}
                  className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-amber-700 hover:bg-amber-100"
                >
                  <Undo2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Undo
                </button>
              </div>
            </div>
          ) : (
            <>
              <YouTubeInput
                id={`${id}-youtube`}
                value={value.youtubeUrl}
                onChange={(youtubeUrl) => onChange({ mode: 'youtube', file: null, youtubeUrl, removed: false })}
                disabled={disabled}
              />
              {hasExistingYouTube && (
                <button
                  type="button"
                  onClick={removeExistingVideo}
                  disabled={disabled}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Remove YouTube video
                </button>
              )}
            </>
          )}
        </div>
      )}

      {message && (
        <p id={`${id}-error`} role="alert" className="text-[11px] font-medium text-red-600">
          {message}
        </p>
      )}
    </div>
  );
};

export { emptyValue as emptyDemoVideoValue };