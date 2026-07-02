import React, { useId } from 'react';

const TextArea = React.forwardRef(({
  label,
  placeholder,
  error,
  helperText,
  className = '',
  rows = 4,
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
      
      <textarea
        id={id}
        ref={ref}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className={`
          w-full px-4 py-3 rounded-xl border bg-white text-sm text-charcoal shadow-sm transition-all focus:outline-none focus:ring-2 resize-none
          ${error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-200/50' 
            : 'border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-primary/20'
          }
        `}
        {...props}
      />

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

TextArea.displayName = 'TextArea';

export default TextArea;
