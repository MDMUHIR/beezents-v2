import { useEffect, useState } from 'react';

/**
 * Creates a `URL.createObjectURL` for a selected file and always revokes the
 * previous URL when the file changes or the component unmounts, preventing
 * memory leaks in image/video previews.
 */
export function useObjectUrl(file: File | null | undefined): string | null {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  return url;
}
