import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { WorkItem } from '../../data/work';

export interface MediaViewerProps {
  item: WorkItem | null;
  items: WorkItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: WorkItem) => void;
}

export const MediaViewer: React.FC<MediaViewerProps> = ({
  item,
  items,
  isOpen,
  onClose,
  onSelect,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < items.length - 1;

  const handlePrevious = useCallback(() => {
    if (hasPrevious) {
      setIsMediaLoaded(false);
      onSelect(items[currentIndex - 1]);
    }
  }, [hasPrevious, currentIndex, items, onSelect]);

  const handleNext = useCallback(() => {
    if (hasNext) {
      setIsMediaLoaded(false);
      onSelect(items[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, items, onSelect]);

  // Reset loading status when item changes
  useEffect(() => {
    setIsMediaLoaded(false);
  }, [item?.id]);

  // Preload next image if applicable
  useEffect(() => {
    if (hasNext && items[currentIndex + 1].type === 'image') {
      const nextImg = new Image();
      nextImg.src = items[currentIndex + 1].src;
    }
  }, [hasNext, currentIndex, items]);

  // Manage body scroll lock and focus restoration
  useEffect(() => {
    if (!isOpen) return;

    // Save previous active element before opening
    previouslyFocusedElementRef.current = document.activeElement as HTMLElement;

    // Lock scroll
    const previousOverflow = document.body.style.overflow;
    const previousPosition = document.body.style.position;
    document.body.style.overflow = 'hidden';

    // Move focus into close button
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;

      // Restore focus to opening element
      if (item?.id) {
        const triggerEl = document.querySelector(`[data-work-item="${item.id}"]`) as HTMLElement;
        if (triggerEl) {
          triggerEl.focus();
        } else if (previouslyFocusedElementRef.current) {
          previouslyFocusedElementRef.current.focus();
        }
      } else if (previouslyFocusedElementRef.current) {
        previouslyFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, item?.id]);

  // Keyboard navigation & Focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Tab' && dialogRef.current) {
        // Simple focus trap
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex="0"]:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handlePrevious, handleNext, onClose]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only track single touch
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX.current;
    const diffY = touchEndY - touchStartY.current;

    // Minimum swipe threshold 50px, horizontal dominant
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        // Swiped Left -> Next
        handleNext();
      } else {
        // Swiped Right -> Previous
        handlePrevious();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!isOpen || !item) return null;

  const isPortrait = item.orientation === 'portrait';

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.category} media viewer: ${item.title || item.alt || 'Campaign item'}`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-[#071A36]/98 backdrop-blur-sm p-3 xs:p-4 sm:p-6 transition-all duration-300 animate-fade-in select-none overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background click listener to close */}
      <div
        className="absolute inset-0 z-0 cursor-default"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ========================================================
          1. TOP UTILITY BAR (METADATA + CLOSE)
          ======================================================== */}
      <div className="relative z-20 w-full max-w-7xl flex items-center justify-between gap-4 py-1.5 px-1 sm:px-2 shrink-0 pointer-events-auto">
        {/* Minimal Category & Counter */}
        <div className="flex items-center gap-3">
          <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-primary bg-white/10 px-3 py-1 rounded-xs border border-white/15">
            {item.category}
          </span>
          <span className="text-xs font-mono text-white/70 font-semibold tracking-wider">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        {/* Accessible Close Button (min 44px touch target) */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-xs border border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          aria-label="Close media viewer (Escape)"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* ========================================================
          2. MAIN MEDIA STAGE (CENTERED & PRESERVED ASPECT RATIO)
          ======================================================== */}
      <div className="relative z-10 flex-1 w-full max-w-7xl flex items-center justify-center px-1 sm:px-12 md:px-16 my-auto overflow-hidden">
        {/* Subtle loading spinner */}
        {!isMediaLoaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <Loader2 className="w-7 h-7 text-brand-primary animate-spin" />
          </div>
        )}

        {/* Desktop Left Navigation Button */}
        {hasPrevious && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-2 sm:left-4 md:left-6 z-20 w-11 h-11 hidden sm:flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-xs border border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Previous media item (Left arrow)"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Desktop Right Navigation Button */}
        {hasNext && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 sm:right-4 md:right-6 z-20 w-11 h-11 hidden sm:flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-xs border border-white/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            aria-label="Next media item (Right arrow)"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Media Frame (Never stretched or cropped; object-fit: contain) */}
        <div
          className={`relative max-w-[92vw] max-h-[76vh] xs:max-h-[78vh] sm:max-h-[82vh] md:max-h-[84vh] flex items-center justify-center transition-opacity duration-300 ${
            isMediaLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {item.type === 'video' ? (
            <video
              ref={videoRef}
              key={item.src}
              src={item.src}
              poster={item.poster}
              controls
              playsInline
              muted
              autoPlay
              onLoadedData={() => setIsMediaLoaded(true)}
              className={`max-w-[92vw] max-h-[76vh] xs:max-h-[78vh] sm:max-h-[82vh] md:max-h-[84vh] object-contain rounded-xs shadow-2xl bg-black/50 ${
                isPortrait ? 'w-auto aspect-[9/16]' : 'w-auto'
              }`}
            />
          ) : (
            <img
              key={item.src}
              src={item.src}
              alt={item.title || item.alt || 'AG ADS Work Media'}
              onLoad={() => setIsMediaLoaded(true)}
              className="max-w-[92vw] max-h-[76vh] xs:max-h-[78vh] sm:max-h-[82vh] md:max-h-[84vh] w-auto h-auto object-contain rounded-xs shadow-2xl"
            />
          )}
        </div>
      </div>

      {/* ========================================================
          3. MINIMAL METADATA & MOBILE TOUCH CONTROLS
          ======================================================== */}
      <div className="relative z-20 w-full max-w-4xl shrink-0 flex flex-col items-center justify-center pb-2 px-4 pointer-events-auto">
        {/* Title / Minimal verified context */}
        {item.title && (
          <div className="text-center max-w-xl mx-auto mb-2.5">
            <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tight">
              {item.title}
            </h3>
          </div>
        )}

        {/* Mobile Navigation Prev/Next Touch Buttons */}
        <div className="flex sm:hidden items-center justify-between w-full max-w-xs gap-3">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={!hasPrevious}
            className="flex-1 min-h-[44px] px-4 py-2.5 bg-white/10 active:bg-white/20 disabled:opacity-25 text-white text-xs font-sans font-bold uppercase rounded-xs border border-white/15 flex items-center justify-center gap-1 transition-opacity"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>PREV</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!hasNext}
            className="flex-1 min-h-[44px] px-4 py-2.5 bg-white/10 active:bg-white/20 disabled:opacity-25 text-white text-xs font-sans font-bold uppercase rounded-xs border border-white/15 flex items-center justify-center gap-1 transition-opacity"
            aria-label="Next item"
          >
            <span>NEXT</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

