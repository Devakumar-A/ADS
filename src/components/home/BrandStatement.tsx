import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ArrowDown,
  ArrowRight,
  MoveUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const BrandStatement: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeChannel, setActiveChannel] = useState<number | null>(null);

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
        threshold: 0.12,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* =========================================================
     POINTER GLOW
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
    let targetX = 0;
    let targetY = 0;

    const updateGlow = () => {
      glow.style.transform = `translate3d(
        ${targetX - 190}px,
        ${targetY - 190}px,
        0
      )`;

      frame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();

      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;

      if (!frame) {
        frame = requestAnimationFrame(updateGlow);
      }
    };

    const handlePointerLeave = () => {
      targetX = section.clientWidth / 2;
      targetY = section.clientHeight / 2;

      if (!frame) {
        frame = requestAnimationFrame(updateGlow);
      }
    };

    section.addEventListener(
      'pointermove',
      handlePointerMove,
      { passive: true }
    );

    section.addEventListener(
      'pointerleave',
      handlePointerLeave
    );

    return () => {
      section.removeEventListener(
        'pointermove',
        handlePointerMove
      );

      section.removeEventListener(
        'pointerleave',
        handlePointerLeave
      );

      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  /* =========================================================
     CHANNEL DATA
     ========================================================= */

  const channels = [
    {
      number: '01',
      title: 'Digital Marketing',
      description:
        'Digital advertising, creative content, branding and web development built around your business.',
      items: [
        'Meta Ads',
        'Google Ads',
        'Social Media Management',
        'Graphic Design',
        'Video Production',
        'Video Editing',
        'Branding',
        'Website Development',
      ],
    },
    {
      number: '02',
      title: 'Outdoor Marketing',
      description:
        'Radio, TV, newspaper, Sun-Pack, LED Van and mall advertising that puts brands in front of real audiences.',
      items: [
        'Radio Advertising',
        'TV Advertising',
        'Newspaper Advertising',
        'Sun-Pack Advertising',
        'LED Van Advertising',
        'Mall Advertising',
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-white text-[#101828]"
    >
      {/* =====================================================
          BACKGROUND
         ===================================================== */}

      {/* Cursor glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 h-[380px] w-[380px] rounded-full bg-[#1769E0]/[0.055] blur-[100px] will-change-transform"
      />

      {/* Fine editorial grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.032]"
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              #0B3B82 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              #0B3B82 1px,
              transparent 1px
            )
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Large ambient circle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[260px] top-[20%] z-0 h-[620px] w-[620px] rounded-full border border-[#0B3B82]/[0.035]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[180px] top-[26%] z-0 h-[460px] w-[460px] rounded-full border border-[#0B3B82]/[0.025]"
      />

      {/* =====================================================
          MAIN CONTAINER
         ===================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28 md:px-10 lg:px-14 lg:py-36 xl:px-16 xl:py-40">

        {/* ===================================================
            TOP META BAR
           =================================================== */}

        <div
          className={`
            mb-16 flex items-center justify-between
            border-b border-[#E4EAF2] pb-5
            transition-all duration-1000
            sm:mb-20
            lg:mb-24
            ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-5 opacity-0'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1769E0]" />

            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B3B82] sm:text-xs">
              AG ADS — ADVANCED GROWTH
            </span>
          </div>

          <span className="hidden font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#98A2B3] sm:block">
            PUDUCHERRY · CHENNAI
          </span>
        </div>

        {/* ===================================================
            HERO STATEMENT
           =================================================== */}

        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.45fr)] lg:items-end lg:gap-20">

          {/* LEFT */}
          <div className="relative">

            {/* Eyebrow */}
            <div
              className={`
                mb-7 flex items-center gap-4
                transition-all delay-100 duration-1000
                ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                }
              `}
            >
              <span className="h-px w-10 bg-[#1769E0]" />

              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-[#1769E0] sm:text-xs">
                OUR APPROACH
              </span>
            </div>

            {/* Main statement */}
            <h2
              className={`
                max-w-[1100px]
                font-display
                text-[clamp(3.2rem,8.3vw,8.6rem)]
                font-extrabold
                uppercase
                leading-[0.84]
                tracking-[-0.065em]
                text-[#071A36]
                transition-all delay-200 duration-[1200ms]
                ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }
              `}
            >
              TWO
              <br />

              <span className="relative inline-block">
                CHANNELS
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[3px] w-[28%] bg-[#1769E0] sm:h-1"
                />
              </span>

              <span className="text-[#B9C8DA]">.</span>

              <br />

              ONE{' '}
              <span className="text-[#0B3B82]">
                GROWTH
              </span>

              <br />

              PARTNER
              <span className="text-[#1769E0]">.</span>
            </h2>

            {/* Small index */}
            <div
              className={`
                absolute
                -bottom-4
                right-0
                hidden
                font-display
                text-[9rem]
                font-bold
                leading-none
                tracking-[-0.08em]
                text-[#071A36]/[0.025]
                transition-opacity duration-[1600ms]
                lg:block
                ${
                  isVisible
                    ? 'opacity-100'
                    : 'opacity-0'
                }
              `}
              aria-hidden="true"
            >
              AG
            </div>
          </div>

          {/* RIGHT */}
          <div
            className={`
              relative lg:pb-2
              transition-all delay-400 duration-1000
              ${
                isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0'
              }
            `}
          >
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-14 bg-[#0B3B82]" />

              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
                DIGITAL × OUTDOOR
              </span>
            </div>

            <p className="max-w-[500px] font-sans text-base leading-8 text-[#475467] sm:text-lg sm:leading-9 lg:text-xl">
              AG ADS brings digital marketing and outdoor
              advertising together to help businesses build
              stronger brands, reach the right audience, and
              turn attention into meaningful growth.
            </p>

            <Link
              to="/about"
              className="group mt-9 inline-flex items-center gap-4 border-b border-[#D0D5DD] pb-3 font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#0B3B82] transition-colors duration-300 hover:border-[#0B3B82]"
            >
              <span>About AG ADS</span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D0D5DD] transition-all duration-300 group-hover:border-[#1769E0] group-hover:bg-[#1769E0] group-hover:text-white">
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        </div>

        {/* ===================================================
            CHANNEL SYSTEM
           =================================================== */}

        <div
          className={`
            mt-20 border-t border-[#DDE5EF]
            transition-all delay-500 duration-1000
            sm:mt-28
            lg:mt-36
            ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-10 opacity-0'
            }
          `}
        >
          {/* Section header */}
          <div className="flex items-center justify-between border-b border-[#E4EAF2] py-5">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#667085]">
              TWO CORE CHANNELS
            </span>

            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#98A2B3]">
              01 — 02
            </span>
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-2">
            {channels.map((channel, index) => {
              const isActive = activeChannel === index;

              return (
                <Link
                  key={channel.number}
                  to="/services"
                  onMouseEnter={() =>
                    setActiveChannel(index)
                  }
                  onMouseLeave={() =>
                    setActiveChannel(null)
                  }
                  onFocus={() =>
                    setActiveChannel(index)
                  }
                  onBlur={() =>
                    setActiveChannel(null)
                  }
                  className={`
                    group relative overflow-hidden
                    border-b border-[#E4EAF2]
                    py-8
                    outline-none
                    transition-all duration-500
                    lg:py-11
                    ${
                      index === 0
                        ? 'lg:border-r lg:pr-12 xl:pr-16'
                        : 'lg:pl-12 xl:pl-16'
                    }
                    focus-visible:ring-2
                    focus-visible:ring-[#1769E0]
                    focus-visible:ring-offset-4
                  `}
                >
                  {/* Large number */}
                  <span
                    aria-hidden="true"
                    className={`
                      pointer-events-none absolute
                      -right-3 -top-8
                      font-display
                      text-[11rem]
                      font-extrabold
                      leading-none
                      tracking-[-0.09em]
                      transition-all duration-700
                      sm:text-[13rem]
                      ${
                        isActive
                          ? 'translate-x-1 text-[#1769E0]/[0.07]'
                          : 'text-[#071A36]/[0.035]'
                      }
                    `}
                  >
                    {channel.number}
                  </span>

                  {/* Top row */}
                  <div className="relative z-10 flex items-start justify-between gap-8">

                    <div>
                      <span
                        className={`
                          mb-4 block
                          font-sans text-[10px]
                          font-bold uppercase
                          tracking-[0.2em]
                          transition-colors duration-300
                          ${
                            isActive
                              ? 'text-[#1769E0]'
                              : 'text-[#98A2B3]'
                          }
                        `}
                      >
                        {channel.number}
                      </span>

                      <h3 className="font-display text-[clamp(1.65rem,3vw,2.7rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em] text-[#101828]">
                        {channel.title}
                      </h3>
                    </div>

                    {/* Arrow */}
                    <span
                      className={`
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        rounded-full border
                        transition-all duration-500
                        ${
                          isActive
                            ? 'border-[#1769E0] bg-[#1769E0] text-white'
                            : 'border-[#D0D5DD] text-[#667085]'
                        }
                      `}
                    >
                      <MoveUpRight
                        className={`
                          h-4 w-4
                          transition-transform duration-500
                          ${
                            isActive
                              ? 'rotate-0'
                              : 'rotate-0'
                          }
                        `}
                      />
                    </span>
                  </div>

                  {/* Description */}
                  <p className="relative z-10 mt-6 max-w-[520px] font-sans text-sm leading-7 text-[#667085] sm:text-base sm:leading-8">
                    {channel.description}
                  </p>

                  {/* Services */}
                  <div className="relative z-10 mt-7 flex flex-wrap gap-x-2 gap-y-2">
                    {channel.items.map((item) => (
                      <span
                        key={item}
                        className={`
                          rounded-full
                          border
                          px-3 py-1.5
                          font-sans
                          text-[9px]
                          font-semibold
                          uppercase
                          tracking-[0.08em]
                          transition-all duration-300
                          sm:text-[10px]
                          ${
                            isActive
                              ? 'border-[#BFD2EA] bg-[#F5F8FC] text-[#0B3B82]'
                              : 'border-[#E4EAF2] bg-white text-[#98A2B3]'
                          }
                        `}
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Bottom interaction line */}
                  <div className="relative z-10 mt-9 flex items-center justify-between border-t border-[#E4EAF2] pt-5">
                    <span
                      className={`
                        font-sans text-[10px]
                        font-bold uppercase
                        tracking-[0.18em]
                        transition-colors duration-300
                        ${
                          isActive
                            ? 'text-[#0B3B82]'
                            : 'text-[#98A2B3]'
                        }
                      `}
                    >
                      Explore services
                    </span>

                    <ArrowRight
                      className={`
                        h-4 w-4
                        transition-all duration-500
                        ${
                          isActive
                            ? 'translate-x-1 text-[#1769E0]'
                            : 'text-[#98A2B3]'
                        }
                      `}
                    />
                  </div>

                  {/* Hover accent */}
                  <span
                    aria-hidden="true"
                    className={`
                      absolute bottom-0 left-0 h-[2px]
                      bg-[#1769E0]
                      transition-all duration-700
                      ${
                        isActive
                          ? 'w-full'
                          : 'w-0'
                      }
                    `}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* ===================================================
            BOTTOM BRAND STATEMENT
           =================================================== */}

        <div
          className={`
            mt-12 flex flex-col gap-5
            transition-all delay-700 duration-1000
            sm:mt-16
            sm:flex-row
            sm:items-center
            sm:justify-between
            ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }
          `}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#1769E0]" />

            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-[#98A2B3] sm:text-[10px]">
              ONE BRAND. EVERY CHANNEL. REAL GROWTH.
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#0B3B82]">
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.18em] text-[#98A2B3]">
              KEEP EXPLORING
            </span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D0D5DD]">
              <ArrowDown className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          ACCESSIBILITY / REDUCED MOTION
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