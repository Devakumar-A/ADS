import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'editorial' | 'reading' | 'full';
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  size = 'default',
  className = '',
  children,
  ...props
}) => {
  const sizeClasses = {
    default: 'max-w-content',
    editorial: 'max-w-editorial',
    reading: 'max-w-reading',
    full: 'max-w-none',
  }[size];

  return (
    <div
      className={`w-full mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
