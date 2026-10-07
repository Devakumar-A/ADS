import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { AspectRatioType } from './MediaImage';

export interface MediaVideoProps {
  src: string;
  poster: string;
  title: string;
  aspect?: AspectRatioType;
  autoPlayInView?: boolean;
  loop?: boolean;
  className?: string;
}

export const MediaVideo: React.FC<MediaVideoProps> = ({
  src,
  poster,
  title,
  aspect = 'landscape',
  autoPlayInView = false,
  loop = true,
  className = '',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClasses: Record<AspectRatioType, string> = {
    landscape: 'aspect-[16/9]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    cinematic: 'aspect-[21/9]',
    classic: 'aspect-[4/3]',
    auto: 'aspect-auto',
  };

  // Viewport intersection observer for autoPlayInView
  useEffect(() => {
    if (!autoPlayInView) return;

    const node = containerRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => setIsPlaying(true)).catch(() => {
            setIsPlaying(false);
          });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [autoPlayInView]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      ref={containerRef}
      className={`group relative overflow-hidden bg-surface-subtle border border-surface-border rounded-sm ${aspectClasses[aspect]} ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={title}
        loop={loop}
        muted={isMuted}
        playsInline
        preload="metadata"
        onLoadedData={() => setIsLoaded(true)}
        className="w-full h-full object-cover"
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-brand-deep/15 group-hover:bg-brand-deep/5 transition-colors duration-300 pointer-events-none" />

      {/* Corporate Media Floating Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 border border-surface-border shadow-sm rounded-sm">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            className="text-brand-deep hover:text-brand-accent transition-colors p-1 focus-visible:ring-1 focus-visible:ring-brand-primary"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="text-brand-deep hover:text-brand-accent transition-colors p-1 focus-visible:ring-1 focus-visible:ring-brand-primary"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-text-muted ml-2 border-l border-surface-border pl-2">
            {isPlaying ? 'Playing' : 'Paused'}
          </span>
        </div>

        <span className="hidden sm:inline-block text-[11px] font-sans font-medium uppercase tracking-wider text-brand-deep bg-white/95 px-3 py-1.5 border border-surface-border rounded-sm shadow-sm">
          {title}
        </span>
      </div>
    </div>
  );
};
