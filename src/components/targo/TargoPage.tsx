import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const TargoPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const aboutVideoRef = useRef<HTMLVideoElement>(null);

  // Robust video playback logic (retry every 1s, muted, retry on click/touch)
  useEffect(() => {
    const playVideos = () => {
      [heroVideoRef.current, aboutVideoRef.current].forEach(v => {
        if (v) {
          v.muted = true;
          const promise = v.play();
          if (promise !== undefined) {
            promise.catch(() => {
              // Swallow rejections
            });
          }
        }
      });
    };

    playVideos();
    const interval = setInterval(playVideos, 1000);
    const handleInteraction = () => playVideos();

    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      clearInterval(interval);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const chamferClip = 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))';

  return (
    <div
      className="w-full text-[#2b3033] selection:bg-[#15BCDF]/20 selection:text-[#15BCDF]"
      style={{
        backgroundColor: '#F2F1F0',
        fontFamily: "'Quantico', 'Arial Narrow', sans-serif",
      }}
    >
      {/* ========================================================
          SECTION 1 — HERO
          min-height: 100svh, background #F2F1F0, overflow hidden
         ======================================================== */}
      <section
        id="hero"
        className="relative w-full overflow-hidden flex flex-col justify-between"
        style={{
          minHeight: '100svh',
          backgroundColor: '#F2F1F0',
        }}
      >
        {/* Background Video */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden z-0"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Desktop Video Positioning */}
          <div className="hidden min-[701px]:block absolute top-0 right-[-20%] w-[99%] h-auto">
            <video
              ref={heroVideoRef}
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_050407_500d0339-ab28-41c1-9688-132a74a3b5aa.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Mobile Video Positioning (<= 700px) */}
          <div className="block min-[701px]:hidden absolute top-0 left-[-12%] w-[119%] h-auto">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_050407_500d0339-ab28-41c1-9688-132a74a3b5aa.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>

          {/* Desktop Only Scrim Overlay on Left 70% */}
          <div
            className="hidden min-[701px]:block absolute inset-y-0 left-0 w-[70%] pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, #F2F1F0 0%, #F2F1F0 55%, rgba(242,241,240,0.85) 78%, rgba(242,241,240,0) 100%)',
            }}
          />
        </div>

        {/* ----------------- NAVBAR ----------------- */}
        <header className="relative z-20 w-full flex items-center justify-between px-5 sm:px-8 lg:px-14 py-6">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            {/* 38px dark (#111) circle containing white 20x8 ellipse rotated -25° */}
            <div
              className="w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#111111' }}
            >
              <div
                className="w-[20px] h-[8px] rounded-full bg-white"
                style={{ transform: 'rotate(-25deg)' }}
              />
            </div>
            <span
              className="font-normal leading-none"
              style={{
                fontSize: 'clamp(22px, 5vw, 30px)',
                fontWeight: 400,
                color: '#111111',
                letterSpacing: '-0.5px',
              }}
            >
              targo
            </span>
          </a>

          {/* Nav Links (Desktop: min-[701px]) */}
          <nav className="hidden min-[701px]:flex items-center gap-[34px]">
            {['HOME', 'ABOUT', 'CONTACT US'].map(link => (
              <a
                key={link}
                href={link === 'ABOUT' ? '#about' : '#hero'}
                className="transition-colors whitespace-nowrap"
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(12px, 2.4vw, 15px)',
                  letterSpacing: '0.06em',
                  color: '#3a3a3a',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = '#000000')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = '#3a3a3a')}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right-Aligned "Contact us" Chamfered Button (Desktop) */}
          <div className="hidden min-[701px]:block">
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 transition-colors cursor-pointer"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                padding: '14px 26px',
                fontSize: 'clamp(12px, 2vw, 14px)',
                fontWeight: 700,
                clipPath: chamferClip,
                textDecoration: 'none',
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.14)')
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')
              }
            >
              <svg
                width="17"
                height="13"
                viewBox="0 0 17 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.7"
                  y="0.7"
                  width="15.6"
                  height="11.6"
                  rx="1.3"
                  stroke="white"
                  strokeWidth="1.4"
                />
                <path d="M1.5 1.5L8.5 7L15.5 1.5" stroke="white" strokeWidth="1.4" />
              </svg>
              <span>CONTACT US</span>
            </a>
          </div>

          {/* Mobile Hamburger Button (<= 700px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[701px]:hidden flex flex-col justify-center items-center gap-[5px] p-2 bg-transparent border-0 cursor-pointer z-30"
            aria-label="Toggle navigation"
          >
            <span className="w-[22px] h-[2px] bg-white block" />
            <span className="w-[22px] h-[2px] bg-white block" />
            <span className="w-[22px] h-[2px] bg-white block" />
          </button>
        </header>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="min-[701px]:hidden absolute top-20 left-4 right-4 bg-[#F2F1F0] border border-slate-300 shadow-xl rounded-2xl p-6 z-30 flex flex-col gap-[18px]"
            >
              {['HOME', 'ABOUT', 'CONTACT US'].map(link => (
                <a
                  key={link}
                  href={link === 'ABOUT' ? '#about' : '#hero'}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: '#1a1c1e',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    fontSize: '16px',
                    textDecoration: 'none',
                  }}
                >
                  {link}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ----------------- HEADLINE (6 STAIRCASE LINES) ----------------- */}
        <div
          className="relative z-10 flex-1 flex flex-col justify-center"
          style={{
            // Desktop padding: min(clamp(40px,9vw,120px),9vh) 20px min(clamp(24px,4vw,44px),5vh) clamp(20px,9vw,118px)
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="headline-container"
          >
            <h1
              className="staircase-heading uppercase font-bold"
              style={{
                lineHeight: 0.98,
                letterSpacing: '0.01em',
                color: '#2b3033',
                fontWeight: 700,
              }}
            >
              <div className="line-1">SCALING</div>
              <div className="line-2">THE</div>
              <div className="line-3">PLATFORM</div>
              <div
                className="line-4"
                style={{
                  marginLeft: 'min(238px, 28vw)',
                }}
              >
                FOR
              </div>
              <div
                className="line-5"
                style={{
                  marginLeft: 'min(238px, 28vw)',
                }}
              >
                YOUR
              </div>
              <div
                className="line-6"
                style={{
                  marginLeft: 'min(238px, 28vw)',
                  color: '#15BCDF',
                }}
              >
                BUSINESS
              </div>
            </h1>
          </motion.div>
        </div>

        {/* ----------------- CTA BUTTON "GET STARTED" ----------------- */}
        <div
          className="relative z-10 hero-cta-wrapper"
          style={{
            // Left edge aligned with FOR/YOUR/BUSINESS indent:
            // calc(clamp(20px, 9vw, 118px) + min(238px, 28vw))
            paddingLeft: 'calc(clamp(20px, 9vw, 118px) + min(238px, 28vw))',
            paddingBottom: 'min(clamp(36px, 6vw, 80px), 7vh)',
            paddingRight: '20px',
          }}
        >
          <motion.a
            href="#about"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 cursor-pointer group transition-all"
            style={{
              backgroundColor: '#15BCDF',
              border: '1px solid #0fa3c2',
              color: '#1a1c1e',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.14em',
              padding: '18px 34px',
              fontSize: 'clamp(13px, 2.2vw, 16px)',
              clipPath: chamferClip,
              boxShadow: '0 0 24px rgba(21, 188, 223, 0.35)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#3fd0ef';
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 0 32px rgba(63, 208, 239, 0.6)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#15BCDF';
              (e.currentTarget as HTMLElement).style.boxShadow =
                '0 0 24px rgba(21, 188, 223, 0.35)';
            }}
          >
            <span>GET STARTED</span>
            {/* Trailing 22x1px dark line */}
            <span
              className="inline-block transition-transform group-hover:translate-x-1"
              style={{
                width: '22px',
                height: '1px',
                backgroundColor: '#1a1c1e',
              }}
            />
          </motion.a>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 — ABOUT
          Background: linear-gradient(180deg, #F2F1F0 0%, #F7F6F8 18%, #F7F6F8 100%)
          Padding: clamp(60px,10vw,140px) 0 clamp(30px,5vw,70px) clamp(20px,9vw,118px)
         ======================================================== */}
      <section
        id="about"
        className="w-full relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #F2F1F0 0%, #F7F6F8 18%, #F7F6F8 100%)',
          paddingTop: 'clamp(60px, 10vw, 140px)',
          paddingBottom: 'clamp(30px, 5vw, 70px)',
          paddingLeft: 'clamp(20px, 9vw, 118px)',
          paddingRight: 0,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-10">
          {/* Left Column (flex 1 1 420px, min-width 300px) */}
          <div
            className="flex-1"
            style={{
              flex: '1 1 420px',
              minWidth: '300px',
            }}
          >
            {/* H2 Staircase: "ABOUT" then "BUSINESS" in #15BCDF indented by min(160px, 18vw) */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="uppercase font-bold"
              style={{
                fontSize: 'clamp(34px, 6.5vw, 72px)',
                lineHeight: 0.98,
                letterSpacing: '0.01em',
                color: '#2b3033',
                fontWeight: 700,
              }}
            >
              <div>ABOUT</div>
              <div
                style={{
                  marginLeft: 'min(160px, 18vw)',
                  color: '#15BCDF',
                }}
              >
                BUSINESS
              </div>
            </motion.h2>

            {/* Paragraph verbatim */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                maxWidth: '520px',
                marginTop: '32px',
                marginLeft: 'min(160px, 18vw)',
                fontSize: 'clamp(14px, 1.6vw, 17px)',
                lineHeight: 1.7,
                color: '#6b6f72',
              }}
            >
              Targo builds the testing infrastructure modern teams rely on. From automated pipelines to
              full-scale QA audits, we make sure your software ships fast and breaks nothing.
              Hundreds of releases, zero surprises.
            </motion.p>

            {/* "LEARN MORE" button identical to hero CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                marginTop: '36px',
                marginLeft: 'min(160px, 18vw)',
              }}
            >
              <a
                href="#hero"
                className="inline-flex items-center gap-3 cursor-pointer group transition-all"
                style={{
                  backgroundColor: '#15BCDF',
                  border: '1px solid #0fa3c2',
                  color: '#1a1c1e',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  padding: '18px 34px',
                  fontSize: 'clamp(13px, 2.2vw, 16px)',
                  clipPath: chamferClip,
                  boxShadow: '0 0 24px rgba(21, 188, 223, 0.35)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#3fd0ef';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 32px rgba(63, 208, 239, 0.6)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#15BCDF';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 24px rgba(21, 188, 223, 0.35)';
                }}
              >
                <span>LEARN MORE</span>
                {/* Trailing 22x1px dark line */}
                <span
                  className="inline-block transition-transform group-hover:translate-x-1"
                  style={{
                    width: '22px',
                    height: '1px',
                    backgroundColor: '#1a1c1e',
                  }}
                />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Video flush to right edge with #15BCDF hue overlay */}
          <div
            className="flex-1 relative overflow-hidden"
            style={{
              minWidth: '320px',
              maxWidth: '640px',
              marginRight: 0,
            }}
          >
            <div className="relative w-full">
              <video
                ref={aboutVideoRef}
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260823_063501_2e2c8971-de1e-473a-8611-a0c9ae7ee186.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-auto block"
                style={{
                  objectFit: 'contain',
                }}
              />
              {/* Overlay rectangle covering video with background #15BCDF and mix-blend-mode: hue */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: '#15BCDF',
                  mixBlendMode: 'hue',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Embedded Styles for Custom Staircase & Responsive Layouts */}
      <style>{`
        /* Desktop Headline Styling */
        @media (min-width: 701px) {
          .headline-container {
            padding: min(clamp(40px, 9vw, 120px), 9vh) 20px min(clamp(24px, 4vw, 44px), 5vh) clamp(20px, 9vw, 118px);
          }
          .staircase-heading {
            font-size: min(clamp(34px, 7.6vw, 80px), 9.2vh);
          }
        }

        /* Mobile Headline Styling (<= 700px) */
        @media (max-width: 700px) {
          .headline-container {
            margin-top: 360px;
            padding: 0 20px 28px 20px;
          }
          .staircase-heading {
            font-size: clamp(34px, 10vw, 56px);
          }
          .hero-cta-wrapper {
            padding-left: 20px !important;
            padding-bottom: 40px !important;
          }
        }
      `}</style>
    </div>
  );
};
export default TargoPage;
