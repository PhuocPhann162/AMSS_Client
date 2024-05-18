import React, { useState } from 'react';

interface StarProps {
  onRating: () => void;
  onHoverIn: () => void;
  onHoverOut: () => void;
  full: boolean;
  color: string;
  size: number;
  disabled: boolean;
}

interface StarRatingProps {
  maxRating?: number;
  defaultRating?: number;
  color?: string;
  size?: number;
  fontSize?: number; // Thêm fontSize vào StarRatingProps
  messages?: string[];
  className?: string;
  onSetRating?: (rating: number) => void;
  disabled?: boolean;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
};

const starContainerStyle: React.CSSProperties = {
  display: 'flex'
};

const StarRating: React.FC<StarRatingProps> = ({
  maxRating = 5,
  color = '#fcc419',
  size = 48,
  fontSize = 16, // Sử dụng fontSize ở đây
  messages = [],
  defaultRating = 0,
  onSetRating,
  disabled = false
}) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (index: number) => {
    if (!disabled) {
      setRating(index);
      if (onSetRating) {
        onSetRating(index);
      }
    }
  };

  const handleHover = (index: number) => {
    if (!disabled) {
      setTempRating(index);
    }
  };

  const textStyle: React.CSSProperties = {
    lineHeight: '1',
    margin: '0',
    marginBottom: '3px',
    color,
    fontSize: `${fontSize}px` // Sử dụng fontSize ở đây
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRating={() => handleRating(i + 1)}
            onHoverIn={() => handleHover(i + 1)}
            onHoverOut={() => handleHover(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
            disabled={disabled}
          />
        ))}
      </div>
      <p style={textStyle} className='text-decoration-underline'>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
        .0
      </p>
    </div>
  );
};

const Star: React.FC<StarProps> = ({ onRating, onHoverIn, onHoverOut, full, color, size, disabled }) => {
  const starStyle: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    display: 'block',
    cursor: disabled ? 'not-allowed' : 'pointer'
  };
  return (
    <span
      role='button'
      style={starStyle}
      onClick={disabled ? undefined : onRating}
      onMouseEnter={disabled ? undefined : onHoverIn}
      onMouseLeave={disabled ? undefined : onHoverOut}
    >
      {full && (
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill={color} stroke={color}>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      )}
      {!full && (
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke={color}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='{2}'
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      )}
    </span>
  );
};

export default StarRating;
