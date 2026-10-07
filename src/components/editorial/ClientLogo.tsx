import React from 'react';

export interface ClientLogoProps {
  name: string;
  category: string;
  symbol?: string;
  className?: string;
}

export const ClientLogo: React.FC<ClientLogoProps> = ({
  name,
  category,
  symbol,
  className = '',
}) => {
  return (
    <div
      className={`group flex flex-col justify-between p-6 border border-surface-border bg-white hover:bg-surface-subtle transition-colors duration-200 min-h-[120px] ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-sans uppercase tracking-widest font-semibold text-text-muted group-hover:text-brand-primary transition-colors">
          {category}
        </span>
        {symbol && (
          <span className="text-xs font-sans text-text-muted opacity-40 group-hover:opacity-100 transition-opacity">
            {symbol}
          </span>
        )}
      </div>

      <div className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-text-primary group-hover:text-brand-primary transition-colors">
        {name}
      </div>
    </div>
  );
};
