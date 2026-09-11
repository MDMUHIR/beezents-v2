import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface SafeImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

/** Renders an image with a graceful branded fallback when the src is missing
 *  or fails to load (broken/empty API URLs, hotlink protection, etc.). */
export const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className = '', fallbackClassName = '' }) => {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div
        aria-label={alt}
        role="img"
        className={`flex items-center justify-center bg-slate-100 text-slate-300 ${className} ${fallbackClassName}`}
      >
        <ImageOff className="w-8 h-8" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default SafeImage;