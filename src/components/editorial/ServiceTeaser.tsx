import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Text } from '../ui/Text';

export interface ServiceTeaserProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  to: string;
  className?: string;
}

export const ServiceTeaser: React.FC<ServiceTeaserProps> = ({
  number,
  title,
  description,
  tags,
  to,
  className = '',
}) => {
  return (
    <Link
      to={to}
      className={`group block relative py-8 xs:py-10 md:py-12 border-b border-surface-border transition-all duration-200 hover:bg-surface-subtle/70 px-2 sm:px-4 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
        {/* Index */}
        <div className="md:col-span-2">
          <span className="font-display font-bold text-lg md:text-xl text-brand-primary tracking-tight block">
            {number}
          </span>
        </div>

        {/* Title & Description */}
        <div className="md:col-span-7">
          <h3 className="font-display text-2xl xs:text-3xl font-bold tracking-tight text-text-primary mb-3 group-hover:text-brand-primary transition-colors">
            {title}
          </h3>
          <Text variant="body-base" tone="secondary" className="max-w-xl">
            {description}
          </Text>

          {/* Sub-channel tags */}
          <div className="flex flex-wrap gap-2 mt-5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-sans font-medium uppercase tracking-wider text-text-secondary px-2.5 py-1 bg-white border border-surface-border rounded-sm group-hover:border-brand-primary/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Action Indicator */}
        <div className="md:col-span-3 flex md:justify-end items-center mt-4 md:mt-0">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-sans font-semibold text-brand-primary group-hover:text-brand-deep transition-colors">
            <span>Explore Channel</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      {/* Subtle left blue indicator on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top" />
    </Link>
  );
};
