import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'blue' | 'outline' | 'dark';
  withDot?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'blue',
  withDot = true,
  className = '',
  children,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-surface-subtle border border-surface-border text-text-secondary',
    blue: 'bg-brand-accent-subtle border border-brand-accent/20 text-brand-primary',
    outline: 'bg-white border border-surface-border text-text-secondary',
    dark: 'bg-white/10 border border-white/20 text-white',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm text-label-caps font-sans tracking-wider ${variantClasses} ${className}`}
      {...props}
    >
      {withDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            variant === 'blue' ? 'bg-brand-primary' : variant === 'dark' ? 'bg-white' : 'bg-brand-accent'
          }`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
