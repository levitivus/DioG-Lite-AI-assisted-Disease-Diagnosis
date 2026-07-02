import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({
  badgeText,
  titleText,
  highlightedText,
  descriptionText,
  align = 'center', // 'left' | 'center'
  className = '',
}) => {
  const isLeft = align === 'left';
  
  return (
    <div className={`max-w-3xl mb-12 ${isLeft ? 'text-left' : 'text-center mx-auto'} ${className}`}>
      {badgeText && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-primary bg-primary-light rounded-full"
        >
          {badgeText}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4"
      >
        {titleText}{' '}
        {highlightedText && (
          <span className="text-gradient-primary">{highlightedText}</span>
        )}
      </motion.h2>
      
      {descriptionText && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
          style={{ marginLeft: isLeft ? 0 : 'auto', marginRight: isLeft ? 0 : 'auto' }}
        >
          {descriptionText}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
