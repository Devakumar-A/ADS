import React from 'react';

export const Marquee: React.FC = () => {
  const rowOne = [
    'BUILD YOUR BRAND',
    'REACH THE RIGHT AUDIENCE',
    'CREATE ATTENTION',
    'GENERATE LEADS',
    'DRIVE GROWTH',
  ];

  const rowTwo = [
    'META ADS',
    'GOOGLE ADS',
    'SOCIAL MEDIA MANAGEMENT',
    'GRAPHIC DESIGN',
    'VIDEO PRODUCTION',
    'VIDEO EDITING',
    'BRANDING',
    'WEBSITE DEVELOPMENT',
    'RADIO',
    'TV',
    'NEWSPAPER',
    'SUN-PACK',
    'LED VAN',
    'MALL ADVERTISING',
  ];

  /*
   * Duplicate the content so the animation can loop
   * continuously without a visible jump.
   */
  const firstTrack = [...rowOne, ...rowOne];
  const secondTrack = [...rowTwo, ...rowTwo];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#061B3D]"
      aria-label="AG ADS marketing capabilities"
    >
      {/* =====================================================
          ROW 01 — GROWTH
         ===================================================== */}

      <div className="relative overflow-hidden border-y border-white/[0.08] py-5 sm:py-6">
        <div
          className="flex w-max items-center whitespace-nowrap"
          style={{
            animation: 'agMarqueeLeft 28s linear infinite',
          }}
        >
          {firstTrack.map((item, index) => (
            <React.Fragment key={`growth-${index}`}>
              <span className="px-5 font-display text-[clamp(1.7rem,4vw,4rem)] font-extrabold uppercase leading-none tracking-[-0.04em] text-white sm:px-8 lg:px-10">
                {item}
              </span>

              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-[#4EA1FF] sm:h-2.5 sm:w-2.5"
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* =====================================================
          ROW 02 — CAPABILITIES
         ===================================================== */}

      <div className="relative overflow-hidden border-b border-white/[0.08] py-4 sm:py-5">
        <div
          className="flex w-max items-center whitespace-nowrap"
          style={{
            animation: 'agMarqueeRight 36s linear infinite',
          }}
        >
          {secondTrack.map((item, index) => (
            <React.Fragment key={`service-${index}`}>
              <span className="px-4 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-[#BFD2EA] sm:px-6 sm:text-xs lg:px-8">
                {item}
              </span>

              <span
                aria-hidden="true"
                className="h-1 w-1 shrink-0 rounded-full bg-[#1769E0] sm:h-1.5 sm:w-1.5"
              />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* =====================================================
          ANIMATION
         ===================================================== */}

      <style>{`
        @keyframes agMarqueeLeft {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes agMarqueeRight {
          from {
            transform: translate3d(-50%, 0, 0);
          }

          to {
            transform: translate3d(0, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [style*="agMarqueeLeft"],
          [style*="agMarqueeRight"] {
            animation: none !important;
            transform: translate3d(0, 0, 0) !important;
          }
        }
      `}</style>
    </section>
  );
};