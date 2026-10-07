import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

export const FinalCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);

  /* =========================================================
     SECTION REVEAL
     ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     POINTER LIGHT
     ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;

    if (!section || !glow) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    if (reducedMotion.matches) return;

    let frame = 0;
    let targetX = section.clientWidth / 2;
    let targetY = section.clientHeight / 2;

    const update = () => {
      glow.style.transform = `
        translate3d(
          ${targetX - 180}px,
          ${targetY - 180}px,
          0
        )
      `;

      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();

      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;

      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    section.addEventListener(
      'pointermove',
      handlePointerMove,
      { passive: true }
    );

    return () => {
      section.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-[#E4EAF2] bg-white text-[#101828]"
      aria-labelledby="final-cta-title"
    >
      {/* =====================================================
          BACKGROUND SYSTEM
         ===================================================== */}

      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              rgba(11,59,130,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(11,59,130,0.035) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '96px 96px',
        }}
      />

      {/* Cursor-following light */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[360px] w-[360px] rounded-full bg-[#1769E0]/[0.045] blur-[90px] will-change-transform"
      />

      {/* Center ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1769E0]/[0.025] blur-[100px]"
      />

      {/* =====================================================
          LARGE BACKGROUND AG
         ===================================================== */}

      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute
          left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          select-none
          font-display
          text-[38vw]
          font-extrabold
          uppercase
          leading-none
          tracking-[-0.12em]
          text-[#071A36]/[0.018]
          transition-all duration-[1800ms]
          sm:text-[32vw]
          lg:text-[27vw]
          ${
            isVisible
              ? 'scale-100 opacity-100'
              : 'scale-95 opacity-0'
          }
        `}
      >
        AG
      </div>

      {/* =====================================================
          OUTER FRAME
         ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-5 bottom-5 border border-[#0B3B82]/[0.045] sm:inset-x-8 sm:top-8 sm:bottom-8 lg:inset-x-12 lg:top-10 lg:bottom-10"
      />

      {/* =====================================================
          MAIN CONTENT
         ===================================================== */}

      <Container
        size="editorial"
        className="relative z-10 px-6 py-20 sm:px-8 sm:py-24 md:py-28 lg:px-12 lg:py-32 xl:py-36"
      >
        <div className="mx-auto max-w-[1100px]">

          {/* =================================================
              TOP META
             ================================================= */}

          <Reveal
            delay={50}
            direction="up"
            distance={18}
          >
            <div className="mb-10 flex items-center justify-between border-b border-[#E4EAF2] pb-5 sm:mb-14">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1769E0]" />

                <span className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-[#0B3B82] sm:text-[10px]">
                  AG ADS — ADVANCED GROWTH
                </span>
              </div>

              <span className="hidden font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-[#98A2B3] sm:block sm:text-[10px]">
                PUDUCHERRY · CHENNAI
              </span>
            </div>
          </Reveal>

          {/* =================================================
              MAIN CTA
             ================================================= */}

          <div className="text-center">

            {/* Eyebrow */}
            <Reveal
              delay={100}
              direction="up"
              distance={20}
            >
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-px w-7 bg-[#1769E0] sm:w-10" />

                <span className="font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-[#1769E0] sm:text-[10px]">
                  START A CONVERSATION
                </span>

                <span className="h-px w-7 bg-[#1769E0] sm:w-10" />
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal
              delay={160}
              direction="up"
              distance={28}
            >
              <h2
                id="final-cta-title"
                className="mx-auto max-w-[1000px] font-display text-[clamp(3rem,8vw,7.8rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.065em] text-[#071A36]"
              >
                LET'S GROW
                <br />

                <span className="text-[#0B3B82]">
                  TOGETHER
                </span>

                <span className="text-[#1769E0]">
                  .
                </span>
              </h2>
            </Reveal>

            {/* Supporting copy */}
            <Reveal
              delay={240}
              direction="up"
              distance={20}
            >
              <p className="mx-auto mt-7 max-w-[570px] font-sans text-sm leading-7 text-[#667085] sm:mt-8 sm:text-base sm:leading-8 lg:text-lg">
                Tell us about your brand, your goals, and where
                you want to go next. Let's build a marketing
                approach designed around meaningful growth.
              </p>
            </Reveal>

            {/* =================================================
                CTA BUTTON
               ================================================= */}

            <Reveal
              delay={320}
              direction="up"
              distance={18}
            >
              <div className="mt-9 flex justify-center sm:mt-10">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-4 rounded-full bg-[#0B3B82] py-2 pl-7 pr-2 font-sans text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-[0_10px_35px_rgba(11,59,130,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#072A5E] hover:shadow-[0_16px_42px_rgba(11,59,130,0.25)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1769E0] focus-visible:ring-offset-4 sm:py-2.5 sm:pl-8 sm:text-xs"
                >
                  <span>
                    LET'S GROW
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0B3B82] transition-transform duration-300 group-hover:rotate-[-5deg] sm:h-11 sm:w-11">
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* =================================================
              BOTTOM INFORMATION STRIP
             ================================================= */}

          <Reveal
            delay={420}
            direction="up"
            distance={18}
          >
            <div className="mt-16 border-t border-[#E4EAF2] pt-6 sm:mt-20 sm:pt-7">

              <div className="grid gap-6 sm:grid-cols-3 sm:items-center">

                {/* Location */}
                <div className="text-center sm:text-left">
                  <span className="block font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
                    LOCATIONS
                  </span>

                  <span className="mt-1.5 block font-sans text-xs font-semibold text-[#344054]">
                    Puducherry · Chennai
                  </span>
                </div>

                {/* Center statement */}
                <div className="hidden text-center sm:block">
                  <span className="font-display text-sm font-bold uppercase tracking-[-0.02em] text-[#0B3B82]">
                    ONE BRAND.
                    <span className="text-[#98A2B3]">
                      {' '}EVERY CHANNEL.
                    </span>
                  </span>
                </div>

                {/* Contact direction */}
                <div className="text-center sm:text-right">
                  <span className="block font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
                    NEXT STEP
                  </span>

                  <Link
                    to="/contact"
                    className="group mt-1.5 inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-[#0B3B82]"
                  >
                    Start a project

                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* =================================================
              BOTTOM ACCENT
             ================================================= */}

          <div
            aria-hidden="true"
            className={`
              mx-auto mt-10 h-px
              bg-gradient-to-r
              from-transparent
              via-[#1769E0]
              to-transparent
              transition-all duration-[1400ms]
              sm:mt-12
              ${
                isVisible
                  ? 'w-full opacity-50'
                  : 'w-0 opacity-0'
              }
            `}
          />
        </div>
      </Container>

      {/* =====================================================
          REDUCED MOTION
         ===================================================== */}

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
};