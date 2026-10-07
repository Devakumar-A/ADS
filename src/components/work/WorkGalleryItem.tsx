import React, { useState } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import { WorkItem } from '../../data/work';

export interface WorkGalleryItemProps {
  item: WorkItem;
  onClick: (item: WorkItem) => void;
}

export const WorkGalleryItem: React.FC<WorkGalleryItemProps> = ({ item, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Derive responsive spans based on orientation and featured flags
  // Using CSS Grid dense layout rules
  const orientation = item.orientation || 'landscape';
  const isFeatured = item.featured;

  let spanClasses = 'col-span-1 row-span-1';

  if (isFeatured) {
    // Large featured item: 2 cols x 2 rows on tablet & desktop, 2 cols on mobile
    spanClasses = 'col-span-2 row-span-2';
  } else if (orientation === 'portrait') {
    // Portrait: 1 col x 2 rows
    spanClasses = 'col-span-1 row-span-2';
  } else if (orientation === 'landscape') {
    // Landscape: 2 cols x 1 row on medium+ screens, 2 cols on mobile if wide
    spanClasses = 'col-span-1 sm:col-span-2 row-span-1';
  } else {
    // Square: 1 col x 1 row
    spanClasses = 'col-span-1 row-span-1';
  }

  // Aspect ratio classes for inner container to prevent layout shift
  const aspectClass =
    isFeatured
      ? 'aspect-[4/3] sm:aspect-square md:aspect-[4/3]'
      : orientation === 'portrait'
      ? 'aspect-[3/4] sm:aspect-[9/16]'
      : orientation === 'landscape'
      ? 'aspect-[16/9] sm:aspect-[16/10]'
      : 'aspect-square';

  return (
    <article
      onClick={() => onClick(item)}
      className={`group relative overflow-hidden bg-surface-subtle border border-surface-border rounded-sm cursor-pointer transition-all duration-300 hover:border-brand-primary/60 hover:shadow-md ${spanClasses}`}
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
      <div className={`relative w-full h-full min-h-[180px] overflow-hidden ${aspectClass}`}>
        {/* Loading skeleton */}
        {!isLoaded && (
          <div
            className="absolute inset-0 bg-surface-subtle animate-pulse flex items-center justify-center z-0"
            aria-hidden="true"
          >
            <div className="w-6 h-6 rounded-full border-2 border-surface-border border-t-brand-primary animate-spin" />
          </div>
        )}

        {/* Media Rendering: Video or Image */}
        {item.type === 'video' ? (
          <div className="relative w-full h-full">
            {item.poster && (
              <img
                src={item.poster}
                alt={item.alt || item.title || 'Video poster'}
                className="w-full h-full object-cover transition-transform duration-500 ease-corporate group-hover:scale-102"
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
              className={`w-full h-full object-cover transition-transform duration-500 ease-corporate group-hover:scale-102 ${
                item.poster ? 'absolute inset-0' : ''
              }`}
            />
            {/* Elegant Video Play Badge (Restrained, no huge YouTube button) */}
            <div className="absolute top-3 right-3 z-10 p-1.5 bg-black/60 backdrop-blur-sm rounded-sm text-white border border-white/10 group-hover:bg-brand-primary transition-colors">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
        ) : (
          <img
            src={item.src}
            alt={item.alt || item.title || 'AG ADS Work'}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ease-corporate group-hover:scale-102 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Subtle Dark Hover Overlay with Category & VIEW → Indicator */}
        <div className="absolute inset-0 bg-brand-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5 z-20 pointer-events-none">
          {/* Top Label */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white px-2.5 py-1 bg-brand-primary rounded-xs shadow-sm">
                {item.category}
              </span>
              {item.isSample && (
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/70 bg-white/15 px-1.5 py-0.5 rounded-xs">
                  SAMPLE
                </span>
              )}
            </div>
            {item.type === 'video' && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-brand-accent-subtle bg-black/40 px-2 py-0.5 rounded-xs">
                VIDEO
              </span>
            )}
          </div>

          {/* Bottom Caption & View action */}
          <div className="flex items-end justify-between gap-2 text-white">
            <div className="max-w-[80%]">
              {item.title ? (
                <h4 className="font-display font-bold text-sm sm:text-base leading-snug line-clamp-2">
                  {item.title}
                </h4>
              ) : (
                <p className="font-sans text-xs text-white/90 line-clamp-2">
                  {item.alt}
                </p>
              )}
            </div>

            <div className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-brand-accent group-hover:text-white transition-colors shrink-0">
              <span>VIEW</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
