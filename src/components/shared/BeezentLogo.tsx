import React, { useState } from 'react';
import { motion } from 'motion/react';

interface BeezentLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'giant';
  variant?: 'full' | 'mark' | 'white';
  showTagline?: boolean;
  animateOnHover?: boolean;
  isParentHovered?: boolean;
}

export const BeezentLogo: React.FC<BeezentLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  showTagline = false,
  animateOnHover = true,
  isParentHovered = false,
}) => {
  const [isSelfHovered, setIsSelfHovered] = useState(false);
  const activeHover = animateOnHover && (isSelfHovered || isParentHovered);

  const sizeMap = {
    sm: { mark: 26, text: 'text-base', tracking: 'tracking-wide' },
    md: { mark: 32, text: 'text-lg', tracking: 'tracking-wider' },
    lg: { mark: 42, text: 'text-xl', tracking: 'tracking-wider' },
    xl: { mark: 56, text: 'text-2xl', tracking: 'tracking-widest' },
    giant: { mark: 96, text: 'text-4xl', tracking: 'tracking-widest' },
  };

  const currentSize = sizeMap[size];
  const isWhite = variant === 'white';

  // The official Beezent Bee Emblem SVG matching the user's BEEZENT LOGO asset
  const MarkSVG = (
    <div className="relative inline-flex items-center justify-center">
      <motion.div
        animate={
          activeHover
            ? {
                y: [0, -7, 1.5, -5, 0],
                x: [0, -1.5, 1.5, -1, 0],
                rotate: [0, -3.5, 3, -1.5, 0],
                scale: [1, 1.08, 1.05, 1.07, 1.06],
              }
            : {
                y: 0,
                x: 0,
                rotate: 0,
                scale: 1,
              }
        }
        transition={
          activeHover
            ? {
                duration: 2.2,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }
            : {
                type: 'spring',
                stiffness: 400,
                damping: 24,
              }
        }
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center justify-center origin-center shrink-0"
      >
        <svg
          width={currentSize.mark}
          height={currentSize.mark}
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-xs"
          aria-label="Beezent Bee Logo"
        >
          <defs>
            <linearGradient id={`bzG_${size}_${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0052CC" />
              <stop offset="50%" stopColor="#0080FF" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>
            <linearGradient id={`bzWL_${size}_${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0055FF" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>
            <linearGradient id={`bzWR_${size}_${variant}`} x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0055FF" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>
            <linearGradient id={`bzB_${size}_${variant}`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#0052CC" />
              <stop offset="30%" stopColor="#0066FF" />
              <stop offset="70%" stopColor="#0099FF" />
              <stop offset="100%" stopColor="#00D2FF" />
            </linearGradient>
          </defs>

          {/* Top Left Antenna (Interactive wiggle on hover) */}
          <motion.g
            animate={activeHover ? { rotate: [0, -4, 3, 0] } : { rotate: 0 }}
            transition={activeHover ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            style={{ transformOrigin: '228px 148px' }}
          >
            <line
              x1="228"
              y1="148"
              x2="175"
              y2="100"
              stroke={isWhite ? '#38BDF8' : '#0052CC'}
              strokeWidth="18"
              strokeLinecap="round"
            />
            <circle cx="174" cy="98" r="22" fill={isWhite ? '#38BDF8' : '#0052CC'} />
          </motion.g>

          {/* Top Right Antenna (Interactive wiggle on hover) */}
          <motion.g
            animate={activeHover ? { rotate: [0, 4, -3, 0] } : { rotate: 0 }}
            transition={activeHover ? { duration: 0.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
            style={{ transformOrigin: '284px 148px' }}
          >
            <line x1="284" y1="148" x2="337" y2="100" stroke="#00A3FF" strokeWidth="18" strokeLinecap="round" />
            <circle cx="338" cy="98" r="22" fill="#00A3FF" />
          </motion.g>

          {/* Lower Left Stalk & Node */}
          <line
            x1="168"
            y1="300"
            x2="114"
            y2="354"
            stroke={isWhite ? '#38BDF8' : '#0052CC'}
            strokeWidth="18"
            strokeLinecap="round"
          />
          <circle cx="112" cy="356" r="20" fill={isWhite ? '#38BDF8' : '#0052CC'} />

          {/* Lower Right Stalk & Node */}
          <line x1="344" y1="300" x2="398" y2="354" stroke="#00A3FF" strokeWidth="18" strokeLinecap="round" />
          <circle cx="400" cy="356" r="20" fill="#00A3FF" />

          {/* Head: Donut Ring */}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 256 122 C 280.85 122 301 142.15 301 167 C 301 191.85 280.85 212 256 212 C 231.15 212 211 191.85 211 167 C 211 142.15 231.15 122 256 122 Z M 256 148 C 266.49 148 275 156.51 275 167 C 275 177.49 266.49 186 256 186 C 245.51 186 237 177.49 237 167 C 237 156.51 245.51 148 256 148 Z"
            fill={`url(#bzG_${size}_${variant})`}
          />

          {/* Left Wing (Sleek aerodynamic loop with hover flutter) */}
          <motion.path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 215 240 C 205 215 178 185 130 182 C 78 178 40 205 25 240 C 12 270 28 298 62 300 C 115 304 185 272 215 240 Z M 165 238 C 145 256 95 275 66 272 C 48 270 42 252 50 236 C 58 218 84 206 124 208 C 150 210 162 225 165 238 Z"
            fill={`url(#bzWL_${size}_${variant})`}
            animate={
              activeHover
                ? {
                    rotate: [0, 8, -4, 6, 0],
                    scaleY: [1, 0.88, 1.05, 0.92, 1],
                  }
                : { rotate: 0, scaleY: 1 }
            }
            transition={
              activeHover
                ? { duration: 0.32, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.2 }
            }
            style={{ transformOrigin: '215px 240px' }}
          />

          {/* Right Wing (Sleek aerodynamic loop with hover flutter) */}
          <motion.path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M 297 240 C 307 215 334 185 382 182 C 434 178 472 205 487 240 C 500 270 484 298 450 300 C 397 304 327 272 297 240 Z M 347 238 C 367 256 417 275 446 272 C 464 270 470 252 462 236 C 454 218 428 206 388 208 C 362 210 350 225 347 238 Z"
            fill={`url(#bzWR_${size}_${variant})`}
            animate={
              activeHover
                ? {
                    rotate: [0, -8, 4, -6, 0],
                    scaleY: [1, 0.88, 1.05, 0.92, 1],
                  }
                : { rotate: 0, scaleY: 1 }
            }
            transition={
              activeHover
                ? { duration: 0.32, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.2 }
            }
            style={{ transformOrigin: '297px 240px' }}
          />

          {/* Body Segments */}
          <path d="M 205 270 C 205 242 307 242 307 270 Z" fill={`url(#bzB_${size}_${variant})`} />
          <rect x="180" y="284" width="152" height="26" rx="13" fill={`url(#bzB_${size}_${variant})`} />
          <rect x="186" y="324" width="140" height="26" rx="13" fill={`url(#bzB_${size}_${variant})`} />
          <rect x="198" y="364" width="116" height="26" rx="13" fill={`url(#bzB_${size}_${variant})`} />
          <path d="M 228 404 L 284 404 L 256 448 Z" fill={`url(#bzB_${size}_${variant})`} />
        </svg>
      </motion.div>

      {/* Altitude ground shadow that dynamically breathes when floating in air */}
      {animateOnHover && (
        <motion.div
          animate={
            activeHover
              ? {
                  scale: [0.9, 0.6, 1.1, 0.7, 0.9],
                  opacity: isWhite ? [0.25, 0.5, 0.2, 0.45, 0.25] : [0.15, 0.35, 0.12, 0.3, 0.15],
                }
              : {
                  scale: 0,
                  opacity: 0,
                }
          }
          transition={
            activeHover
              ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
          className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-1.5 rounded-full pointer-events-none blur-xs ${
            isWhite ? 'bg-[#38BDF8]' : 'bg-[#0282EB]'
          }`}
        />
      )}
    </div>
  );

  if (variant === 'mark') {
    return (
      <div
        onMouseEnter={() => setIsSelfHovered(true)}
        onMouseLeave={() => setIsSelfHovered(false)}
        className={`inline-flex items-center justify-center cursor-pointer ${className}`}
      >
        {MarkSVG}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setIsSelfHovered(true)}
      onMouseLeave={() => setIsSelfHovered(false)}
      className={`group inline-flex items-center gap-2.5 select-none cursor-pointer ${className}`}
    >
      {MarkSVG}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-black ${currentSize.text} ${currentSize.tracking} uppercase tracking-wider font-sans transition-colors duration-200 ${
            isWhite ? 'text-white' : 'text-[#111827]'
          }`}
          style={{ letterSpacing: '0.05em' }}
        >
          BEEZEN<span className="text-[#0282EB]">TS</span>
        </span>
        {showTagline && (
          <span
            className={`text-[9px] font-semibold tracking-widest uppercase mt-0.5 ${
              isWhite ? 'text-slate-300' : 'text-[#0282EB]'
            }`}
          >
            AI Automation Agency
          </span>
        )}
      </div>
    </div>
  );
};

export default BeezentLogo;
