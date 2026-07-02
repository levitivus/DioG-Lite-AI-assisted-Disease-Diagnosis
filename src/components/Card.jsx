import React from 'react';

const Card = ({
  children,
  className = '',
  hoverEffect = true,
  glass = false,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300
        ${hoverEffect ? 'hover:shadow-md hover:border-gray-200/80 hover:-translate-y-0.5' : ''}
        ${glass ? 'glass' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
