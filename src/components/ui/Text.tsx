import React from 'react';

export type TextVariant = 'body-lg' | 'body-base' | 'body-sm' | 'label-caps' | 'label-xs';
export type TextTone = 'primary' | 'secondary' | 'muted' | 'blue' | 'accent' | 'white' | 'white-muted';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  tone?: TextTone;
  as?: 'p' | 'span' | 'div' | 'label';
  balance?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body-base',
  tone = 'secondary',
  as = 'p',
  balance = false,
  className = '',
  children,
  ...props
}) => {
  const Tag = as as React.ElementType;

  const variantClasses: Record<TextVariant, string> = {
    'body-lg': 'text-body-lg font-normal',
    'body-base': 'text-body-base font-normal',
    'body-sm': 'text-body-sm font-normal',
    'label-caps': 'text-label-caps uppercase tracking-wider font-semibold font-sans',
    'label-xs': 'text-label-xs uppercase tracking-wide font-bold font-sans',
  };

  const toneClasses: Record<TextTone, string> = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    muted: 'text-text-muted',
    blue: 'text-brand-primary',
    accent: 'text-brand-accent',
    white: 'text-white',
    'white-muted': 'text-text-white-muted',
  };

  return (
    <Tag
      className={`
        font-sans
        ${variantClasses[variant]}
        ${toneClasses[tone]}
        ${balance ? 'text-balance' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
};
