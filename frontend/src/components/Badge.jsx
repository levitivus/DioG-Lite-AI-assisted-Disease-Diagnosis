import React from 'react';

const Badge = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
  size = 'md', // 'sm' | 'md'
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';
  
  const variants = {
    primary: 'bg-primary-light text-primary border border-primary/10',
    secondary: 'bg-gray-100 text-gray-700 border border-gray-200/50',
    accent: 'bg-teal-50 text-accent border border-accent/10',
    success: 'bg-emerald-50 text-success border border-success/10',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200/50',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200/50',
    info: 'bg-sky-50 text-sky-700 border border-sky-200/50',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="mr-1 h-3 w-3 shrink-0" />}
      {children}
    </span>
  );
};

export default Badge;
