import React, { useId } from 'react';

const Input = React.forwardRef(({
  label,
  type = 'text',
  placeholder,
  error,
  helperText,
  icon: Icon,
  className = '',
  required = false,
  ...props
}, ref) => {
  const id = useId();

  return (
    <div className={`w-full flex flex-col items-start gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-gray-700 tracking-wide uppercase">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="relative w-full">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Icon className="h-4.5 w-4.5" />
          </div>
        )}
        
        <input
          id={id}
          type={type}
          ref={ref}
          placeholder={placeholder}
          required={required}
          className={`
            w-full py-2.5 rounded-xl border bg-white text-sm text-charcoal shadow-sm transition-all focus:outline-none focus:ring-2
            ${Icon ? 'pl-11 pr-4' : 'px-4'}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200/50' 
              : 'border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-primary/20'
            }
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs text-red-600 font-medium">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="text-xs text-gray-400 font-medium">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
