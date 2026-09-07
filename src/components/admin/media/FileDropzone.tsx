import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import {
  acceptedExtensionsLabel,
  maxSizeLabel,
  type MediaKind,
} from '../../../lib/media/validation';

interface FileDropzoneProps {
  id: string;
  kind: MediaKind;
  onFile: (file: File) => void;
  disabled?: boolean;
  compact?: boolean;
  title?: string;
}

/**
 * Accessible drag & drop file picker.
 *
 * The file input is visually hidden but focusable, so keyboard users can tab
 * to it and activate the picker with Enter/Space. The dropzone also responds
 * to drag events for mouse users.
 */
export const FileDropzone: React.FC<FileDropzoneProps> = ({
  id,
  kind,
  onFile,
  disabled = false,
  compact = false,
  title,
}) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = kind === 'image'
    ? 'image/jpeg,image/png,image/gif,image/webp,image/avif'
    : 'video/mp4,video/webm,video/quicktime,video/ogg';

  const handleFiles = (files: FileList | null) => {
    const file = files && files[0];
    if (file) onFile(file);
  };

  return (
    <div
      className={`relative rounded-2xl border-2 border-dashed transition-colors ${
        dragging ? 'border-[#0282EB] bg-blue-50/60' : 'border-slate-300 bg-slate-50/60 hover:border-[#0282EB]/60 hover:bg-blue-50/30'
      } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${compact ? 'p-4' : 'p-8'}`}
      onDragEnter={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
        className="sr-only"
        aria-describedby={`${id}-hint`}
      />
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center gap-2 text-center cursor-pointer focus:outline-none"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[#0282EB]">
          <UploadCloud className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-xs font-semibold text-slate-700">
          {title || (kind === 'image' ? 'Drag & drop an image here' : 'Drag & drop a video here')}
        </span>
        <span className="rounded-xl bg-[#0282EB] px-4 py-2 text-xs font-semibold text-white shadow-xs">
          {kind === 'image' ? 'Choose Image' : 'Choose Video'}
        </span>
        <span id={`${id}-hint`} className="text-[11px] text-slate-400">
          {acceptedExtensionsLabel(kind)} · Max {maxSizeLabel(kind)}
        </span>
      </label>
    </div>
  );
};