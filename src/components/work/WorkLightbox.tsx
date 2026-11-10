import React, { useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { WorkItem } from '../../data/workData';

export interface WorkLightboxProps {
  items: WorkItem[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const WorkLightbox: React.FC<WorkLightboxProps> = ({
  items,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}) => {
  const activeItem = items[activeIndex];
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Play video with sound ON, falling back to muted if browser blocks audio autoplay
  const playVideo = useCallback((videoEl: HTMLVideoElement | null) => {
    if (!videoEl) return;
    try {
      videoEl.muted = false;
      videoEl.volume = 1;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser autoplay policy blocks unmuted audio
          videoEl.muted = true;
          videoEl.play().catch(() => {});
        });
      }
    } catch {
      // Ignore
    }
  }, []);

  // Safe navigation helpers that pause previous video
  const handlePrevious = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onPrevious();
  }, [onPrevious]);

  const handleNext = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onNext();
  }, [onNext]);

  // Clean close helper
  const handleClose = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  }, [onClose]);

  // Handle immediate play if video is already ready on item change
  useEffect(() => {
    if (activeItem.type !== 'video') return;

    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 2) {
      playVideo(video);
    }

    return () => {
      if (video) {
        video.pause();
      }
    };
  }, [activeItem.id, activeItem.src, activeItem.type, playVideo]);

  // Make sure video is paused when modal unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  // Lock body scroll and handle focus trap / keyboard navigation
  useEffect(() => {
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on mount
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleClose();
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
        return;
      }

      // Focus trap inside modal
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);

      if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [handleClose, handlePrevious, handleNext]);

  // Mobile touch swipe handling
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    touchStartY.current = event.touches[0]?.clientY ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const endX = event.changedTouches[0]?.clientX ?? 0;
    const endY = event.changedTouches[0]?.clientY ?? 0;

    const deltaX = endX - touchStartX.current;
    const deltaY = endY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (Math.abs(deltaX) < 45) return;

    if (deltaX < 0) {
      handleNext();
    } else {
      handlePrevious();
    }
  };

  // Close when clicking directly on the backdrop container
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      ref={dialogRef}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        h-[100dvh]
        max-h-[100dvh]
        flex-col
        bg-[#061326]/[0.98]
        text-white
        backdrop-blur-md
        pt-[env(safe-area-inset-top)]
        pb-[env(safe-area-inset-bottom)]
        pl-[env(safe-area-inset-left)]
        pr-[env(safe-area-inset-right)]
        animate-[lightboxFadeIn_200ms_ease-out]
      "
      role="dialog"
      aria-modal="true"
      aria-label={`${activeItem.title} media lightbox`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleBackdropClick}
    >
      {/* HEADER */}
      <div
        className="
          flex
          shrink-0
          items-center
          justify-between
          border-b
          border-white/10
          px-4
          py-3.5
          sm:px-6
          lg:px-10
        "
      >
        <div className="flex items-center gap-3 sm:gap-4">
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
          ref={closeButtonRef}
          type="button"
          onClick={handleClose}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            text-white
            transition-colors
            hover:border-white/50
            hover:bg-white/10
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#60A5FA]
            sm:h-10
            sm:w-10
          "
          aria-label="Close media lightbox"
        >
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>

      {/* MEDIA CONTAINER */}
      <div
        className="
          relative
          flex
          min-h-0
          flex-1
          items-center
          justify-center
          overflow-hidden
          px-3
          py-4
          sm:px-14
          md:px-20
          lg:px-28
        "
        onClick={handleBackdropClick}
      >
        {/* PREVIOUS BUTTON */}
        <button
          type="button"
          onClick={handlePrevious}
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
            rounded-full
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
          aria-label="Previous item"
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
            animate-[lightboxScaleIn_250ms_ease-out]
          "
          onClick={handleBackdropClick}
        >
          {activeItem.type === 'image' ? (
            <img
              src={activeItem.src}
              alt={activeItem.title}
              draggable={false}
              className="
                max-h-[75dvh]
                sm:max-h-[78dvh]
                max-w-full
                w-auto
                select-none
                object-contain
                rounded-[2px]
                shadow-2xl
              "
            />
          ) : (
            <div
              className={`
                flex
                items-center
                justify-center
                ${
                  activeItem.ratio === '16/9'
                    ? 'w-full max-w-5xl aspect-video max-h-[75dvh] sm:max-h-[78dvh]'
                    : 'h-full max-h-[75dvh] sm:max-h-[78dvh] w-auto aspect-[9/16]'
                }
              `}
            >
              <video
                ref={videoRef}
                key={activeItem.src}
                src={activeItem.src}
                poster={activeItem.poster}
                controls
                autoPlay
                playsInline
                preload="auto"
                onLoadedData={(e) => {
                  playVideo(e.currentTarget);
                }}
                onCanPlay={(e) => {
                  if (e.currentTarget.paused) {
                    playVideo(e.currentTarget);
                  }
                }}
                className="
                  h-full
                  w-full
                  object-contain
                  rounded-[2px]
                  shadow-2xl
                "
              />
            </div>
          )}
        </div>

        {/* NEXT BUTTON */}
        <button
          type="button"
          onClick={handleNext}
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
            rounded-full
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
          aria-label="Next item"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* MOBILE SWIPE LABEL */}
        <span
          className="
            pointer-events-none
            absolute
            bottom-2
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
          Swipe to navigate
        </span>
      </div>

      {/* FOOTER */}
      <div
        className="
          flex
          shrink-0
          flex-col
          gap-3
          border-t
          border-white/10
          px-4
          py-3.5
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
              sm:text-[9px]
            "
          >
            {activeItem.category}
          </span>
          <span
            className="
              mt-0.5
              block
              font-display
              text-base
              font-bold
              tracking-[-0.02em]
              text-white
              sm:text-lg
            "
          >
            {activeItem.title}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
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
              onClick={handlePrevious}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                text-white
              "
              aria-label="Previous item"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                text-white
              "
              aria-label="Next item"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes lightboxScaleIn {
          from {
            opacity: 0;
            transform: scale(0.975);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[lightboxFadeIn_200ms_ease-out\\],
          .animate-\\[lightboxScaleIn_250ms_ease-out\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
