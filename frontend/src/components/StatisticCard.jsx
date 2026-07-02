import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const StatisticCard = ({
  icon: Icon,
  value, // string format, e.g. "10,000+"
  label,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState('0');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  // Extract number and suffix (e.g., 10000 and "+")
  useEffect(() => {
    if (!isInView) return;
    
    const numericPart = parseInt(value.replace(/[^0-9]/g, ''), 10);
    const suffix = value.replace(/[0-9,]/g, '');
    
    if (isNaN(numericPart)) {
      setDisplayValue(value);
      return;
    }
    
    let start = 0;
    const duration = 1500; // ms
    const steps = 60;
    const increment = numericPart / steps;
    const stepTime = duration / steps;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericPart) {
        clearInterval(timer);
        setDisplayValue(value);
      } else {
        // Format with thousands separator if needed
        const formatted = Math.floor(start).toLocaleString();
        setDisplayValue(`${formatted}${suffix}`);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <div
      ref={ref}
      className={`flex items-center gap-5 p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary/10 transition-colors shadow-sm ${className}`}
    >
      {/* Icon */}
      {Icon && (
        <div className="p-4 rounded-xl bg-primary-light text-primary">
          <Icon className="h-6 w-6" />
        </div>
      )}
      
      {/* Label and Number */}
      <div>
        <div className="text-2xl md:text-3xl font-bold font-heading text-gray-900 tracking-tight">
          {displayValue}
        </div>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
          {label}
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
