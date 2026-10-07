import React, { useState } from 'react';

export type AspectRatioType = 'landscape' | 'portrait' | 'square' | 'cinematic' | 'classic' | 'auto';

export interface MediaImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspect?: AspectRatioType;
  caption?: string;
  priority?: boolean;
  containerClassName?: string;
  imageClassName?: string;
}

export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt,
  aspect = 'landscape',
  caption,
  priority = false,
  containerClassName = '',
  imageClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClasses: Record<AspectRatioType, string> = {
    landscape: 'aspect-[16/9]',
    portrait: 'aspect-[3/4]',
    square: 'aspect-square',
    cinematic: 'aspect-[21/9]',
    classic: 'aspect-[4/3]',
    auto: 'aspect-auto',
  };

  return (
    <figure className={`relative w-full overflow-hidden bg-surface-subtle border border-surface-border rounded-sm ${containerClassName}`}>
      <div className={`relative w-full overflow-hidden ${aspectClasses[aspect]}`}>
        {/* Loading skeleton placeholder */}
        {!isLoaded && !hasError && (
          <div
            className="absolute inset-0 bg-surface-subtle animate-pulse flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="w-7 h-7 rounded-full border-2 border-surface-border border-t-brand-primary animate-spin" />
          </div>
        )}

        {/* Fallback state if image fails */}
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-subtle text-text-muted p-4 text-center">
            <span className="text-xs uppercase tracking-wider font-sans font-semibold">Image Unavailable</span>
            <span className="text-xs mt-1 max-w-xs truncate">{alt}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`
              w-full h-full object-cover transition-all duration-500 ease-corporate
              ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-102'}
              ${imageClassName}
            `}
            {...props}
          />
        )}
      </div>

      {caption && (
        <figcaption className="p-2.5 text-xs text-text-muted font-sans border-t border-surface-border bg-white">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
