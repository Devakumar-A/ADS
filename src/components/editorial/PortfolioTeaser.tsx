import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MediaImage, AspectRatioType } from '../ui/MediaImage';

export interface PortfolioTeaserProps {
  client: string;
  industry: string;
  campaignTitle: string;
  resultMetric: string;
  resultLabel: string;
  imageSrc: string;
  aspect?: AspectRatioType;
  to?: string;
  className?: string;
}

export const PortfolioTeaser: React.FC<PortfolioTeaserProps> = ({
  client,
  industry,
  campaignTitle,
  resultMetric,
  resultLabel,
  imageSrc,
  aspect = 'landscape',
  to = '/work',
  className = '',
}) => {
  return (
    <Link
      to={to}
      className={`group block bg-white border border-surface-border rounded-sm overflow-hidden transition-all duration-200 hover:border-brand-primary/40 hover:shadow-md ${className}`}
    >
      {/* Image with subtle zoom on hover */}
      <div className="relative overflow-hidden">
        <MediaImage
          src={imageSrc}
          alt={`${client} — ${campaignTitle}`}
          aspect={aspect}
          imageClassName="group-hover:scale-103 transition-transform duration-500 ease-corporate"
        />
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-brand-deep bg-white/95 backdrop-blur-sm px-2.5 py-1 border border-surface-border rounded-sm shadow-sm">
            {industry}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-xs uppercase tracking-wider font-sans font-semibold text-text-muted">
            {client}
          </span>
          <ArrowUpRight className="w-4 h-4 text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <h4 className="font-display text-xl font-bold tracking-tight text-text-primary mb-4 group-hover:text-brand-primary transition-colors">
          {campaignTitle}
        </h4>

        {/* Growth Result Callout */}
        <div className="pt-4 border-t border-surface-border flex items-baseline justify-between">
          <span className="font-sans text-xs text-text-muted uppercase font-medium">Outcome</span>
          <div className="text-right">
            <span className="font-display text-lg font-extrabold text-brand-primary">
              {resultMetric}
            </span>
            <span className="text-xs text-text-secondary ml-1.5 font-sans">
              {resultLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
