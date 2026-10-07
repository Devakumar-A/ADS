import React, { useState } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import { WorkItem } from '../../data/work';

export interface CollageSlotLayout {
  // Desktop 12-col grid spans
  desktopSpan: string;
  // Tablet 6-col grid spans
  tabletSpan: string;
  // Mobile 2-col grid spans
  mobileSpan: string;
  // Visual height class
  heightClass: string;
  // Aspect ratio class specifically for mobile
  aspectClass?: string;
  // Media aspect or fit mode
  fitMode: 'cover' | 'contain';
}

export interface WorkGalleryGridItemProps {
  item: WorkItem;
  slotLayout: CollageSlotLayout;
  onClick: (item: WorkItem) => void;
}

export const WorkGalleryGridItem: React.FC<WorkGalleryGridItemProps> = ({
  item,
  slotLayout,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <article
      data-work-item={item.id}
      onClick={() => onClick(item)}
      className={`group relative overflow-hidden bg-white border border-surface-border rounded-xs cursor-pointer transition-all duration-300 hover:border-brand-primary/60 hover:shadow-sm ${slotLayout.mobileSpan} ${slotLayout.tabletSpan} ${slotLayout.desktopSpan}`}
      tabIndex={0}
      role="button"
      aria-label={`View ${item.category} work: ${item.title || item.alt}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(item);
        }
      }}
    >
      <div className={`relative w-full overflow-hidden ${slotLayout.heightClass} ${slotLayout.aspectClass || ''}`}>
        {/* Loading skeleton */}
        {!isLoaded && (
          <div
            className="absolute inset-0 bg-surface-subtle animate-pulse flex items-center justify-center z-0"
            aria-hidden="true"
          >
            <div className="w-5 h-5 rounded-full border-2 border-surface-border border-t-brand-primary animate-spin" />
          </div>
        )}

        {/* Media Rendering: Video or Image */}
        {item.type === 'video' ? (
          <div className="relative w-full h-full">
            {item.poster && (
              <img
                src={item.poster}
                alt={item.alt || item.title || 'Video poster'}
                className={`w-full h-full ${
                  slotLayout.fitMode === 'contain' ? 'object-contain bg-black/5' : 'object-cover'
                } transition-transform duration-500 ease-corporate group-hover:scale-[1.015]`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
              />
            )}
            <video
              src={item.src}
              poster={item.poster}
              muted
              playsInline
              preload="metadata"
              onLoadedData={() => setIsLoaded(true)}
              className={`w-full h-full ${
                slotLayout.fitMode === 'contain' ? 'object-contain bg-black/5' : 'object-cover'
              } transition-transform duration-500 ease-corporate group-hover:scale-[1.015] ${
                item.poster ? 'absolute inset-0' : ''
              }`}
            />
            {/* Minimal Circular Play Indicator: 28px on mobile, 32px on desktop */}
            <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white border border-white/15 group-hover:bg-brand-primary group-hover:border-brand-primary transition-colors shadow-sm">
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current ml-0.5" />
            </div>
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.alt || item.title || 'AG ADS Work'}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full ${
              slotLayout.fitMode === 'contain' ? 'object-contain bg-black/5' : 'object-cover'
            } transition-transform duration-500 ease-corporate group-hover:scale-[1.015] ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Desktop Hover Overlay: Subtle & Restrained rgba(7, 42, 94, 0.18) */}
        <div className="absolute inset-0 bg-[#072A5E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-between p-3.5 sm:p-4 z-20 pointer-events-none">
          {/* Top Category Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white px-2 py-0.5 bg-brand-primary/95 rounded-xs shadow-sm">
                {item.category}
              </span>
              {item.isSample && (
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/80 bg-black/40 px-1.5 py-0.5 rounded-xs">
                  SAMPLE
                </span>
              )}
            </div>
            {item.type === 'video' && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-white bg-black/50 px-2 py-0.5 rounded-xs">
                VIDEO
              </span>
            )}
          </div>

          {/* Bottom Caption & View Action */}
          <div className="flex items-end justify-between gap-2 text-white bg-gradient-to-t from-black/60 via-black/20 to-transparent -mx-3.5 -mb-3.5 p-3.5">
            <div className="max-w-[82%]">
              <h4 className="font-display font-bold text-xs sm:text-sm text-white drop-shadow-sm leading-snug line-clamp-1">
                {item.title || item.alt}
              </h4>
            </div>

            <div className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-white group-hover:text-brand-accent-subtle transition-colors shrink-0">
              <span>VIEW</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
