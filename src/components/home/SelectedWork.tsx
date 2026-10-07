import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

type MediaType = 'image' | 'video';

interface WorkItem {
  id: number;
  title: string;
  category: string;
  type: MediaType;
  src: string;
  poster?: string;
  className: string;
  objectPosition?: string;
}

/* ============================================================
   WORK DATA
============================================================ */

const workItems: WorkItem[] = [
  {
    id: 1,
    title: 'Campaign Creative',
    category: 'DIGITAL CAMPAIGNS',
    type: 'image',
    src: '/assets/work/work-01.jpg',
    className: 'work-01',
  },
  {
    id: 2,
    title: 'Brand Communication',
    category: 'CREATIVE',
    type: 'image',
    src: '/assets/work/work-02.jpg',
    className: 'work-02',
  },
  {
    id: 3,
    title: 'Visual Identity',
    category: 'BRANDING',
    type: 'image',
    src: '/assets/work/work-03.jpg',
    className: 'work-03',
  },
  {
    id: 4,
    title: 'Campaign Film',
    category: 'VIDEO PRODUCTION',
    type: 'video',
    src: '/assets/work/work-04.mp4',
    poster: '/assets/work/work-04-poster.jpg',
    className: 'work-04',
  },
  {
    id: 5,
    title: 'Outdoor Campaign',
    category: 'OUTDOOR ADVERTISING',
    type: 'image',
    src: '/assets/work/work-05.jpg',
    className: 'work-05',
  },
  {
    id: 6,
    title: 'Creative Direction',
    category: 'CREATIVE',
    type: 'image',
    src: '/assets/work/work-06.jpg',
    className: 'work-06',
  },
  {
    id: 7,
    title: 'Campaign Visual',
    category: 'OUTDOOR ADVERTISING',
    type: 'video',
    src: '/assets/work/work-07.mp4',
    poster: '/assets/work/work-07-poster.jpg',
    className: 'work-07',
  },
];

/* ============================================================
   MEDIA TILE
============================================================ */

interface MediaTileProps {
  item: WorkItem;
  index: number;
  onOpen: (index: number) => void;
}

const MediaTile: React.FC<MediaTileProps> = ({
  item,
  index,
  onOpen,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (item.type !== 'video' || !videoRef.current) return;

    videoRef.current.play().catch(() => {
      // Autoplay can be blocked by the browser.
    });
  };

  const handleMouseLeave = () => {
    if (item.type !== 'video' || !videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="
        group
        relative
        block
        h-full
        min-h-0
        w-full
        overflow-hidden
        border-0
        bg-[#071A36]
        p-0
        text-left
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#1769E0]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#E8F0FA]
      "
      aria-label={`Open ${item.title}`}
    >
      {/* IMAGE */}

      {item.type === 'image' && (
        <img
          src={item.src}
          alt={item.title}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.04]
          "
          style={{
            objectPosition: item.objectPosition || 'center',
          }}
        />
      )}

      {/* VIDEO */}

      {item.type === 'video' && (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.04]
          "
        />
      )}

      {/* DARK MEDIA GRADIENT */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-t
          from-[#071A36]/90
          via-[#071A36]/15
          to-transparent
          opacity-75
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* INDEX */}

      <span
        className="
          absolute
          left-4
          top-4
          z-20
          font-sans
          text-[9px]
          font-bold
          tracking-[0.18em]
          text-white/80
          sm:left-5
          sm:top-5
        "
      >
        {String(item.id).padStart(2, '0')}
      </span>

      {/* VIDEO INDICATOR */}

      {item.type === 'video' && (
        <span
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/45
            bg-[#071A36]/45
            text-white
            backdrop-blur-sm
            transition-all
            duration-300
            group-hover:border-white
            group-hover:bg-[#0B3B82]
            sm:right-5
            sm:top-5
          "
          aria-hidden="true"
        >
          <Play
            className="ml-0.5 h-3.5 w-3.5 fill-current"
            strokeWidth={1.5}
          />
        </span>
      )}

      {/* HOVER ARROW */}

      <span
        className="
          absolute
          right-4
          top-4
          z-30
          flex
          h-9
          w-9
          translate-y-2
          items-center
          justify-center
          bg-white
          text-[#0B3B82]
          opacity-0
          transition-all
          duration-300
          group-hover:translate-y-0
          group-hover:opacity-100
          sm:right-5
          sm:top-5
        "
        aria-hidden="true"
      >
        <ArrowUpRight
          className="h-4 w-4"
          strokeWidth={1.7}
        />
      </span>

      {/* CONTENT */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-20
          p-4
          sm:p-5
          md:p-6
        "
      >
        <div
          className="
            translate-y-1
            transition-transform
            duration-300
            group-hover:translate-y-0
          "
        >
          <span
            className="
              mb-1.5
              block
              font-sans
              text-[8px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white/75
              sm:text-[9px]
            "
          >
            {item.category}
          </span>

          <h3
            className="
              max-w-[95%]
              font-display
              text-lg
              font-bold
              leading-[1.05]
              tracking-[-0.025em]
              text-white
              sm:text-xl
              md:text-2xl
            "
          >
            {item.title}
          </h3>
        </div>
      </div>
    </button>
  );
};

/* ============================================================
   FULLSCREEN VIEWER
============================================================ */

interface WorkViewerProps {
  items: WorkItem[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const WorkViewer: React.FC<WorkViewerProps> = ({
  items,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}) => {
  const activeItem = items[activeIndex];

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        onPrevious();
      }

      if (event.key === 'ArrowRight') {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [onClose, onPrevious, onNext]);

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    touchStartX.current =
      event.touches[0]?.clientX ?? null;

    touchStartY.current =
      event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    if (
      touchStartX.current === null ||
      touchStartY.current === null
    ) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? 0;
    const endY = event.changedTouches[0]?.clientY ?? 0;

    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (Math.abs(deltaX) < 50) {
      return;
    }

    if (deltaX < 0) {
      onNext();
    } else {
      onPrevious();
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        flex-col
        bg-[#061326]/[0.98]
        text-white
      "
      role="dialog"
      aria-modal="true"
      aria-label={`${activeItem.title} media viewer`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* VIEWER HEADER */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          border-b
          border-white/10
          px-4
          py-4
          sm:px-6
          lg:px-10
        "
      >
        <div className="flex items-center gap-4">
          <span
            className="
              font-sans
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#60A5FA]
              sm:text-[10px]
            "
          >
            SELECTED WORK
          </span>

          <span className="hidden h-3 w-px bg-white/20 sm:block" />

          <span
            className="
              hidden
              font-sans
              text-[9px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-white/50
              sm:block
            "
          >
            AG ADS — ADVANCED GROWTH
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            border
            border-white/15
            text-white
            transition-colors
            hover:border-white/40
            hover:bg-white/10
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#60A5FA]
          "
          aria-label="Close media viewer"
        >
          <X className="h-5 w-5" strokeWidth={1.6} />
        </button>
      </div>

      {/* VIEWER MEDIA */}

      <div
        className="
          relative
          flex
          min-h-0
          flex-1
          items-center
          justify-center
          overflow-hidden
          px-4
          py-6
          sm:px-14
          md:px-20
          lg:px-28
        "
      >
        {/* PREVIOUS */}

        <button
          type="button"
          onClick={onPrevious}
          className="
            absolute
            left-3
            top-1/2
            z-20
            hidden
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            border
            border-white/15
            bg-[#071A36]/80
            text-white
            backdrop-blur-sm
            transition-all
            hover:border-white/40
            hover:bg-[#0B3B82]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#60A5FA]
            sm:flex
            lg:left-8
          "
          aria-label="Previous work"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* ACTIVE MEDIA */}

        <div
          key={activeItem.id}
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            animate-[workFadeIn_250ms_ease-out]
          "
        >
          {activeItem.type === 'image' ? (
            <img
              src={activeItem.src}
              alt={activeItem.title}
              draggable={false}
              className="
                max-h-full
                max-w-full
                select-none
                object-contain
              "
            />
          ) : (
            <video
              key={activeItem.src}
              src={activeItem.src}
              poster={activeItem.poster}
              controls
              autoPlay
              playsInline
              className="
                max-h-full
                max-w-full
                object-contain
              "
            />
          )}
        </div>

        {/* NEXT */}

        <button
          type="button"
          onClick={onNext}
          className="
            absolute
            right-3
            top-1/2
            z-20
            hidden
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            border
            border-white/15
            bg-[#071A36]/80
            text-white
            backdrop-blur-sm
            transition-all
            hover:border-white/40
            hover:bg-[#0B3B82]
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#60A5FA]
            sm:flex
            lg:right-8
          "
          aria-label="Next work"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* MOBILE SWIPE LABEL */}

        <span
          className="
            pointer-events-none
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            font-sans
            text-[8px]
            uppercase
            tracking-[0.16em]
            text-white/30
            sm:hidden
          "
        >
          Swipe to explore
        </span>
      </div>

      {/* VIEWER FOOTER */}

      <div
        className="
          flex
          shrink-0
          flex-col
          gap-4
          border-t
          border-white/10
          px-4
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
          lg:px-10
        "
      >
        <div>
          <span
            className="
              block
              font-sans
              text-[8px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#60A5FA]
            "
          >
            {activeItem.category}
          </span>

          <span
            className="
              mt-1
              block
              font-display
              text-lg
              font-bold
              tracking-[-0.02em]
              text-white
            "
          >
            {activeItem.title}
          </span>
        </div>

        <div className="flex items-center justify-between gap-5 sm:justify-end">
          <span
            className="
              font-sans
              text-[9px]
              font-semibold
              tracking-[0.15em]
              text-white/40
            "
          >
            {String(activeIndex + 1).padStart(2, '0')} /{' '}
            {String(items.length).padStart(2, '0')}
          </span>

          <div className="flex gap-2 sm:hidden">
            <button
              type="button"
              onClick={onPrevious}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                border
                border-white/15
                text-white
              "
              aria-label="Previous work"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onNext}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                border
                border-white/15
                text-white
              "
              aria-label="Next work"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   SELECTED WORK
============================================================ */

export const SelectedWork: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(
    null,
  );

  const openViewer = (index: number) => {
    setActiveIndex(index);
  };

  const closeViewer = () => {
    setActiveIndex(null);
  };

  const goPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === 0
        ? workItems.length - 1
        : current - 1;
    });
  };

  const goNext = () => {
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === workItems.length - 1
        ? 0
        : current + 1;
    });
  };

  return (
    <>
      <section
        id="work"
        className="
          relative
          w-full
          overflow-hidden
          border-y
          border-[#CFDCED]
          bg-[#E8F0FA]
          py-10
          sm:py-12
          md:py-14
          lg:py-16
        "
        aria-labelledby="selected-work-title"
      >
        {/* Ambient subtle floating glow elements */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-24 h-[500px] w-[500px] rounded-full bg-[#1769E0]/[0.035] blur-3xl animate-float-slow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 bottom-24 h-[440px] w-[440px] rounded-full bg-[#0B3B82]/[0.03] blur-3xl animate-float-gentle"
        />

        <Container
          size="editorial"
          className="relative z-10 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12"
        >
          {/* ======================================================
              HEADER
          ====================================================== */}

          <Reveal delay={60} direction="up" distance={20}>
            <div
              className="
                mb-6
                flex
                flex-col
                gap-5
                border-t
                border-[#CFDCED]
                pt-4
                sm:mb-8
                sm:pt-5
                md:mb-10
                lg:flex-row
                lg:items-end
                lg:justify-between
            "
            >
              <div className="min-w-0">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-8 shrink-0 bg-[#1769E0]" />

                  <span
                    className="
                      font-sans
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.22em]
                      text-[#1769E0]
                      sm:text-[10px]
                    "
                  >
                    SELECTED WORK
                  </span>
                </div>

                <h2
                  id="selected-work-title"
                  className="
                    max-w-5xl
                    font-display
                    text-[clamp(2.8rem,6.8vw,7rem)]
                    font-extrabold
                    uppercase
                    leading-[0.86]
                    tracking-[-0.06em]
                    text-[#0B1830]
                  "
                >
                  WORK THAT
                  <br />
                  <span className="text-[#0B3B82]">
                    GETS NOTICED.
                  </span>
                </h2>
              </div>

              <div
                className="
                  w-full
                  max-w-sm
                  lg:mb-1
                  lg:pb-1
                "
              >
                <p
                  className="
                    font-sans
                    text-sm
                    leading-7
                    text-[#667085]
                    sm:text-base
                  "
                >
                  A selection of creative work and campaigns
                  created for digital and physical audiences.
                </p>
              </div>
            </div>
          </Reveal>

          {/* ======================================================
              EDITORIAL GRID

              DESKTOP: 12 COLUMN SYSTEM
              MOBILE: 2 COLUMN SYSTEM
          ====================================================== */}

          <div className="work-grid">
            {workItems.map((item, index) => (
              <Reveal
                key={item.id}
                className={`${item.className} h-full w-full min-h-0`}
                delay={index * 80}
                direction="up"
                distance={32}
                duration={750}
              >
                <MediaTile
                  item={item}
                  index={index}
                  onOpen={openViewer}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ==========================================================
          FULLSCREEN VIEWER
      ========================================================== */}

      {activeIndex !== null && (
        <WorkViewer
          items={workItems}
          activeIndex={activeIndex}
          onClose={closeViewer}
          onPrevious={goPrevious}
          onNext={goNext}
        />
      )}

      {/* ==========================================================
          GRID SYSTEM
      ========================================================== */}

      <style>{`
        /* ========================================================
           DESKTOP — 12 COLUMN EDITORIAL GRID
           
           01 = 5 columns × 2 rows
           02 = 3 columns
           03 = 3 columns
           04 = 5 columns
           05 = 2 columns
           06 = 3 columns
           07 = 5 columns
        ======================================================== */

        .work-grid {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          grid-template-rows:
            minmax(250px, 1.75fr)
            minmax(135px, 1fr)
            minmax(135px, 1fr);
          grid-template-areas:
            "one one one one one two two two three three three three"
            "one one one one one four four four four four five five"
            "six six six seven seven seven seven seven . . . .";
          gap: 12px;
          align-items: stretch;
        }

        .work-01 {
          grid-area: one;
        }

        .work-02 {
          grid-area: two;
        }

        .work-03 {
          grid-area: three;
        }

        .work-04 {
          grid-area: four;
        }

        .work-05 {
          grid-area: five;
        }

        .work-06 {
          grid-area: six;
        }

        .work-07 {
          grid-area: seven;
        }

        /* ========================================================
           LARGE DESKTOP
        ======================================================== */

        @media (min-width: 1440px) {
          .work-grid {
            grid-template-rows:
              minmax(290px, 1.8fr)
              minmax(155px, 1fr)
              minmax(155px, 1fr);
            gap: 14px;
          }
        }

        /* ========================================================
           STANDARD DESKTOP / LAPTOP
        ======================================================== */

        @media (min-width: 1024px) and (max-width: 1279px) {
          .work-grid {
            grid-template-rows:
              minmax(220px, 1.7fr)
              minmax(125px, 1fr)
              minmax(125px, 1fr);
            gap: 10px;
          }
        }

        /* ========================================================
           TABLET — 8 COLUMN SYSTEM
        ======================================================== */

        @media (min-width: 768px) and (max-width: 1023px) {
          .work-grid {
            grid-template-columns: repeat(8, minmax(0, 1fr));
            grid-template-rows:
              minmax(220px, 1.7fr)
              minmax(125px, 1fr)
              minmax(125px, 1fr);
            grid-template-areas:
              "one one one one two two three three"
              "one one one one four four four five"
              "six six seven seven seven seven . .";
            gap: 10px;
          }
        }

        /* ========================================================
           MOBILE
           
           Intentionally preserves the current 2-column
           asymmetric editorial composition.
        ======================================================== */

        @media (max-width: 767px) {
          .work-grid {
            display: grid;
            width: 100%;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-template-rows:
              minmax(0, 1.55fr)
              minmax(145px, 0.92fr)
              minmax(0, 0.95fr)
              minmax(145px, 0.92fr)
              minmax(0, 1.45fr);
            grid-template-areas:
              "one one"
              "two three"
              "four four"
              "five six"
              "seven seven";
            gap: 7px;
          }
        }

        /* ========================================================
           SMALL MOBILE
        ======================================================== */

        @media (max-width: 480px) {
          .work-grid {
            gap: 6px;
            grid-template-rows:
              minmax(0, 1.5fr)
              minmax(135px, 0.92fr)
              minmax(0, 0.94fr)
              minmax(135px, 0.92fr)
              minmax(0, 1.42fr);
          }
        }

        /* ========================================================
           VERY SMALL MOBILE
        ======================================================== */

        @media (max-width: 360px) {
          .work-grid {
            gap: 5px;
            grid-template-rows:
              minmax(230px, 1.45fr)
              minmax(125px, 0.9fr)
              minmax(190px, 0.94fr)
              minmax(125px, 0.9fr)
              minmax(210px, 1.4fr);
          }
        }

        /* ========================================================
           REDUCED MOTION
        ======================================================== */

        @media (prefers-reduced-motion: reduce) {
          .work-grid *,
          .work-grid *::before,
          .work-grid *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }

        /* ========================================================
           VIEWER ANIMATION
        ======================================================== */

        @keyframes workFadeIn {
          from {
            opacity: 0;
            transform: scale(0.985);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default SelectedWork;