import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'compact' | 'default' | 'spacious' | 'hero';
  border?: 'none' | 'top' | 'bottom' | 'both';
  surface?: 'ground' | 'subtle' | 'deep-blue' | 'accent-subtle';
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  spacing = 'default',
  border = 'none',
  surface = 'ground',
  className = '',
  children,
  ...props
}) => {
  const spacingClasses = {
    none: 'py-0',
    compact: 'py-5 xs:py-6 sm:py-7 md:py-8 lg:py-10',
    default: 'py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16',
    spacious: 'py-10 xs:py-12 sm:py-14 md:py-16 lg:py-20',
    hero: 'pt-6 pb-8 xs:pt-7 xs:pb-9 sm:pt-8 sm:pb-10 md:pt-10 md:pb-12 lg:pt-12 lg:pb-14',
  }[spacing];

  const borderClasses = {
    none: '',
    top: 'border-t border-surface-border',
    bottom: 'border-b border-surface-border',
    both: 'border-y border-surface-border',
  }[border];

  const surfaceClasses = {
    ground: 'bg-white text-text-primary',
    subtle: 'bg-surface-subtle text-text-primary',
    'deep-blue': 'bg-brand-deep text-white',
    'accent-subtle': 'bg-brand-accent-subtle text-text-primary',
  }[surface];

  return (
    <section
      className={`relative w-full ${surfaceClasses} ${spacingClasses} ${borderClasses} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
