import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { WorkItem } from '../../data/workData';

export interface WorkCardProps {
  item: WorkItem;
  index: number;
  isMobileActive?: boolean;
  onOpen: (index: number) => void;
  onIntersectionRatio?: (id: number, ratio: number) => void;
  className?: string;
}

export const WorkCard: React.FC<WorkCardProps> = ({
  item,
  index,
  isMobileActive = false,
  onOpen,
  onIntersectionRatio,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile / touch IntersectionObserver (~60% threshold)
  useEffect(() => {
    if (item.type !== 'video' || !onIntersectionRatio) return;
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onIntersectionRatio(item.id, entry.intersectionRatio);
      },
      {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
        rootMargin: '0px',
      }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      onIntersectionRatio(item.id, 0);
    };
  }, [item.id, item.type, onIntersectionRatio]);

  // Handle mobile active state (only 1 video plays at a time on mobile)
  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return;

    // Only apply in touch/mobile environments
    const isTouch = window.matchMedia('(hover: none), (max-width: 1023px)').matches;
    if (!isTouch) return;

    if (isMobileActive) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked or interrupted
          });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isMobileActive, item.type]);

  // Desktop hover-to-play handlers
  const handleMouseEnter = () => {
    if (item.type !== 'video' || !videoRef.current) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (item.type !== 'video' || !videoRef.current) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  const ratioClass =
    item.ratio === '16/9'
      ? 'aspect-[16/9]'
      : index === 1 || index === 2
      ? 'aspect-[9/16] lg:aspect-auto'
      : 'aspect-[9/16]';

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-0 ${className}`}
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          group
          relative
          block
          w-full
          h-full
          min-h-0
          ${ratioClass}
          overflow-hidden
          border-0
          bg-[#071A36]
          p-0
          text-left
          cursor-pointer
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#1769E0]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[#E8F0FA]
        `}
        aria-label={`Open ${item.title}`}
      >
        {/* IMAGE */}
        {item.type === 'image' && (
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
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
          />
        )}

        {/* VIDEO */}
        {item.type === 'video' && (
          <video
            ref={videoRef}
            src={`${item.src}#t=0.001`}
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

        {/* NUMBER LABEL */}
        <span
          className="
            absolute
            left-3.5
            top-3.5
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

        {/* PLAY INDICATOR ICON (Hidden when video is playing) */}
        {item.type === 'video' && (
          <span
            className={`
              absolute
              right-3.5
              top-3.5
              z-20
              flex
              h-8
              w-8
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
              sm:right-5
              sm:top-5
              sm:h-9
              sm:w-9
              group-hover:border-white
              group-hover:bg-[#0B3B82]
              ${isPlaying ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}
            `}
            aria-hidden="true"
          >
            <Play
              className="ml-0.5 h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current"
              strokeWidth={1.5}
            />
          </span>
        )}

        {/* HOVER ARROW */}
        <span
          className="
            pointer-events-none
            absolute
            right-3.5
            top-3.5
            z-30
            flex
            h-8
            w-8
            translate-y-2
            items-center
            justify-center
            bg-white
            text-[#0B3B82]
            opacity-0
            transition-all
            duration-300
            sm:right-5
            sm:top-5
            sm:h-9
            sm:w-9
            group-hover:translate-y-0
            group-hover:opacity-100
          "
          aria-hidden="true"
        >
          <ArrowUpRight
            className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            strokeWidth={1.7}
          />
        </span>

        {/* CONTENT OVERLAY */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            z-20
            p-3.5
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
                mb-1
                block
                font-sans
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-white/75
                sm:mb-1.5
                sm:text-[9px]
              "
            >
              {item.category}
            </span>

            <h3
              className="
                max-w-[95%]
                font-display
                text-base
                font-bold
                leading-[1.1]
                tracking-[-0.025em]
                text-white
                sm:text-lg
                md:text-xl
                lg:text-2xl
              "
            >
              {item.title}
            </h3>
          </div>
        </div>
      </button>
    </div>
  );
};
