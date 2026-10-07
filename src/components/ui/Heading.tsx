import React from 'react';

export type HeadingLevel = 'display-2xl' | 'display-xl' | 'display-lg' | 'h1' | 'h2' | 'h3' | 'h4';
export type HeadingColor = 'default' | 'blue' | 'white' | 'accent';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
  color?: HeadingColor;
  uppercase?: boolean;
  balance?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  level = 'h2',
  as,
  color = 'default',
  uppercase = false,
  balance = true,
  className = '',
  children,
  ...props
}) => {
  const Tag = as || (
    level === 'display-2xl' || level === 'display-xl' || level === 'display-lg' || level === 'h1'
      ? 'h1'
      : level === 'h2'
      ? 'h2'
      : level === 'h3'
      ? 'h3'
      : 'h4'
  );

  const levelClasses: Record<HeadingLevel, string> = {
    'display-2xl': 'font-display text-display-2xl font-extrabold tracking-tight',
    'display-xl': 'font-display text-display-xl font-extrabold tracking-tight',
    'display-lg': 'font-display text-display-lg font-bold tracking-tight',
    'h1': 'font-display text-heading-1 font-bold tracking-tight',
    'h2': 'font-display text-heading-2 font-bold tracking-tight',
    'h3': 'font-display text-heading-3 font-semibold tracking-tight',
    'h4': 'font-sans text-lg md:text-xl font-semibold',
  };

  const colorClasses: Record<HeadingColor, string> = {
    default: 'text-text-primary',
    blue: 'text-brand-primary',
    white: 'text-white',
    accent: 'text-brand-accent',
  };

  return (
    <Tag
      className={`
        ${levelClasses[level]}
        ${colorClasses[color]}
        ${uppercase ? 'uppercase' : ''}
        ${balance ? 'text-balance' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
};
