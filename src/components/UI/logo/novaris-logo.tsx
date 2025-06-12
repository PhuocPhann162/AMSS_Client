import React from 'react';

export type NovarisLogoProps = {
  size?: number | string;
  className?: string;
  alt?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const NovarisLogo: React.FC<NovarisLogoProps> = ({
  size = 40,
  className = '',
  alt = 'Novaris Logo',
  ...props
}) => {
  const dimension = typeof size === 'number' ? `${size}rem` : size;

  return (
    <img
      src={'/logo_official.png'}
      width={dimension}
      height={dimension}
      alt={alt}
      tabIndex={0}
      role='img'
      className={`rounded-lg object-contain focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
      {...props}
    />
  );
};
