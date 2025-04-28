
import React from 'react';
import { MapPin } from 'lucide-react';
import { CulturalSite } from '@/data/culturalData';

interface StoryCardProps {
  site: CulturalSite;
  onClick?: () => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ site, onClick }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'monument':
        return 'bg-terracotta text-white';
      case 'festival':
        return 'bg-gold text-gray-900';
      case 'art':
        return 'bg-emerald text-white';
      case 'heritage':
        return 'bg-deepBlue text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div 
      className="w-72 flex-shrink-0 rounded-lg overflow-hidden shadow-md hover-lift cursor-pointer glass-card"
      onClick={onClick}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={site.imageUrl} 
          alt={site.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "https://placehold.co/400x300/terracotta/white?text=Cultural+Site";
          }}
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(site.category)}`}>
            {getCategoryLabel(site.category)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-serif font-semibold text-lg mb-1 text-gray-900 dark:text-gray-100">{site.name}</h3>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{site.location}</span>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
          {site.shortDescription}
        </p>
        
        <button
          className="text-sm text-terracotta font-medium hover:underline focus:outline-none"
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default StoryCard;
