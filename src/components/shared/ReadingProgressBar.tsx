import React, { useEffect, useState } from 'react';
import { useRouter } from '../../context/RouterContext';

/**
 * Checks if the current path represents a blog post or long-form publication content.
 */
export const isLongFormContent = (pathname: string): boolean => {
  return (
    pathname.startsWith('/blog') ||
    pathname.startsWith('/case-studies') ||
    pathname.startsWith('/how-it-works') ||
    pathname.startsWith('/solutions') ||
    pathname.startsWith('/services') ||
    pathname.startsWith('/projects') ||
    pathname.startsWith('/about')
  );
};

export const ReadingProgressBar: React.FC = () => {
  const { path } = useRouter();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Determine whether the current view is a long-form reading article
    const isLongForm = isLongFormContent(path);
    setIsVisible(isLongForm);

    if (!isLongForm) {
      setProgress(0);
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollableDistance = documentHeight - windowHeight;

          if (scrollableDistance <= 0) {
            setProgress(0);
          } else {
            const currentPercentage = Math.min(
              100,
              Math.max(0, (scrollTop / scrollableDistance) * 100)
            );
            setProgress(currentPercentage);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Calculate immediately on mount or route switch
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [path]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      id="reading-progress-container"
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none h-[3px] bg-slate-200/30 backdrop-blur-[1px] transition-opacity duration-300"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      {/* Brand Primary Color Progress Fill */}
      <div
        id="reading-progress-bar"
        className="h-full bg-gradient-to-r from-[#2469E5] via-[#3B82F6] to-[#2469E5] relative shadow-[0_0_8px_rgba(36,105,229,0.7)] transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      >
        {/* Subtle luminous glow beacon at the leading edge */}
        {progress > 0 && progress < 100 && (
          <span
            id="reading-progress-glow-tip"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#2469E5,0_0_2px_#2469E5]"
          />
        )}
      </div>
    </div>
  );
};

/**
 * Hook to retrieve the current reading percentage for active long-form pages.
 */
export function useReadingProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const scrollableDistance = documentHeight - windowHeight;

          if (scrollableDistance <= 0) {
            setProgress(0);
          } else {
            const currentPercentage = Math.min(
              100,
              Math.max(0, (scrollTop / scrollableDistance) * 100)
            );
            setProgress(currentPercentage);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return progress;
}

export default ReadingProgressBar;
