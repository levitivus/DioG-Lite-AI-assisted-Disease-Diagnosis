import React from 'react';
import Card from './Card';

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = '',
  ...props
}) => {
  return (
    <Card
      className={`relative group overflow-hidden border border-gray-100/80 bg-white p-8 flex flex-col items-start h-full transition-all duration-300 hover:shadow-xl hover:border-primary/10 ${className}`}
      {...props}
    >
      {/* Decorative gradient blur background */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />
      
      {/* Icon Container */}
      <div className="p-3.5 rounded-2xl bg-primary-light text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6 shadow-sm shadow-primary/5">
        {Icon && <Icon className="h-6 w-6" />}
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed font-medium">
        {description}
      </p>
    </Card>
  );
};

export default FeatureCard;
