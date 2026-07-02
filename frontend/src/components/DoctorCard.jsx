import React from 'react';
import { Star, Award, Building, Heart } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const DoctorCard = ({
  photo,
  name,
  specialty,
  hospital,
  rating,
  experience,
  onBook,
  className = '',
}) => {
  return (
    <Card className={`relative group overflow-hidden border border-gray-100 p-0 flex flex-col h-full bg-white transition-all duration-300 hover:shadow-xl hover:border-primary/10 ${className}`}>
      {/* Favorite Button */}
      <button className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-400 hover:text-red-500 transition-colors shadow-sm cursor-pointer">
        <Heart className="h-4.5 w-4.5 fill-current" />
      </button>

      {/* Image Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={photo}
          alt={name}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Rating badge */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-gray-800">{rating}</span>
          <span className="text-xs text-gray-400 font-medium">(100+ reviews)</span>
        </div>

        {/* Doctor Details */}
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-1">
          {name}
        </h3>
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
          {specialty}
        </p>

        {/* Meta Grid */}
        <div className="space-y-2 mb-5 flex-grow">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Building className="h-4 w-4 shrink-0 text-gray-400" />
            <span className="truncate">{hospital}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Award className="h-4 w-4 shrink-0 text-gray-400" />
            <span>{experience} Years Experience</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300"
          onClick={onBook}
        >
          View Profile
        </Button>
      </div>
    </Card>
  );
};

export default DoctorCard;
