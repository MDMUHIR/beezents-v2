import React, { useState } from 'react';
import { Trash2, Undo2 } from 'lucide-react';
import { FileDropzone } from './FileDropzone';
import { MediaPreview } from './MediaPreview';
import { validateMediaFile } from '../../../lib/media/validation';
import { useObjectUrl } from '../../../lib/media/preview';

export interface ImageFieldValue {
  /** Validated file the admin wants to upload (replaces existing). */
  file: File | null;
  /** True when the existing image should be removed on save. */
  removed: boolean;
}

export interface ImageUploadProps {
  id: string;
  label: string;
  hint?: string;
  /** URL of the currently stored image (edit mode). */
  existingUrl?: string | null;
  value: ImageFieldValue;
  onChange: (value: ImageFieldValue) => void;
  /** External (submit/backend) error message. */
  error?: string | null;
  disabled?: boolean;
}

/**
 * Reusable image upload field used for project cover images, solution images
 * and case-study images. Handles pick/drop, preview, replace and remove.
 */
export const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  label,
  hint,
  existingUrl = null,
  value,
  onChange,
  error = null,
  disabled = false,
}) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const objectUrl = useObjectUrl(value.file);

  const hasExisting = Boolean(existingUrl);

  const selectFile = (file: File) => {
    setFileError(null);
    const result = validateMediaFile(file, 'image');
    if (!result.valid) {
      setFileError(result.error);
      return;
    }
    onChange({ file, removed: false });
  };

  const clearSelection = () => {
    onChange({ file: null, removed: false });
  };

  const removeExisting = () => {
    setFileError(null);
    onChange({ file: null, removed: true });
  };

  const undoRemove = () => {
    onChange({ file: null, removed: false });
  };

  const message = error || fileError;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">{label}</span>
        {hint && <span className="text-[11px] text-slate-400">{hint}</span>}
      </div>

      {value.file ? (
        <MediaPreview
          mediaType="image"
          src={objectUrl || ''}
          fileName={value.file.name}
          fileSize={value.file.size}
          alt={value.file.name}
          badge={hasExisting ? 'Replacement' : 'Selected'}
          actions={
            <>
              {hasExisting && (
                <button
                  type="button"
                  onClick={removeExisting}
                  disabled={disabled}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Remove existing
                </button>
              )}
              <button
                type="button"
                onClick={clearSelection}
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
              The existing image will be removed when you save.
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
          <FileDropzone id={`${id}-pick`} kind="image" onFile={selectFile} disabled={disabled} compact />
        </div>
      ) : hasExisting ? (
        <>
          <MediaPreview
            mediaType="image"
            src={existingUrl as string}
            alt={`Current ${label.toLowerCase()}`}
            meta="Current"
            actions={
              <button
                type="button"
                onClick={removeExisting}
                disabled={disabled}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                Remove
              </button>
            }
          />
          <FileDropzone
            id={`${id}-pick`}
            kind="image"
            onFile={selectFile}
            disabled={disabled}
            compact
            title="Replace with a new image"
          />
        </>
      ) : (
        <FileDropzone id={`${id}-pick`} kind="image" onFile={selectFile} disabled={disabled} />
      )}

      {message && (
        <p id={`${id}-error`} role="alert" className="text-[11px] font-medium text-red-600">
          {message}
        </p>
      )}
    </div>
  );
};