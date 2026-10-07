import React from 'react';
import { Text } from '../ui/Text';

export interface StatItemProps {
  value: string;
  label: string;
  description?: string;
  trend?: string;
  index?: string;
  className?: string;
}

export const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  description,
  trend,
  index,
  className = '',
}) => {
  return (
    <div
      className={`group relative p-6 xs:p-8 bg-white border-t border-surface-border transition-colors duration-200 hover:bg-surface-subtle ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        {index && (
          <span className="text-xs font-sans font-semibold tracking-wider text-text-muted">
            {index}
          </span>
        )}
        {trend && (
          <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-brand-primary px-2.5 py-0.5 bg-brand-accent-subtle border border-brand-accent/20 rounded-sm">
            {trend}
          </span>
        )}
      </div>

      <div className="font-display text-4xl xs:text-5xl sm:text-6xl font-extrabold tracking-tight text-brand-deep mb-2">
        {value}
      </div>

      <div className="text-sm font-semibold uppercase tracking-wider text-text-primary mb-1.5 font-sans">
        {label}
      </div>

      {description && (
        <Text variant="body-sm" tone="secondary" className="mt-1">
          {description}
        </Text>
      )}

      {/* Subtle bottom line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
    </div>
  );
};
