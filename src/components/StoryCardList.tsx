
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import StoryCard from './StoryCard';
import { culturalSites, CulturalSite } from '@/data/culturalData';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const StoryCardList: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  
  const featuredSites = culturalSites.filter(site => site.isFeatured);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (siteId: string) => {
    setSelectedSite(siteId);
  };

  const handleCloseDialog = () => {
    setSelectedSite(null);
  };

  const navigateToDetail = (siteId: string) => {
    window.location.href = `/detail/${siteId}`;
    handleCloseDialog();
  };

  const selectedSiteData = selectedSite !== null 
    ? culturalSites.find(site => site.id === selectedSite) 
    : null;

  return (
    <div className="relative py-6">
      <h2 className="section-title">
        Explore Featured Destinations
      </h2>
      
      {/* Scroll buttons */}
      <div className="absolute right-0 top-6 flex space-x-2">
        <button 
          onClick={() => scroll('left')}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Card container */}
      <div 
        ref={scrollRef}
        className="scroll-container py-4"
      >
        {featuredSites.map(site => (
          <StoryCard 
            key={site.id} 
            site={site} 
            onClick={() => handleCardClick(site.id)}
          />
        ))}
      </div>

      {/* Detail Dialog */}
      {selectedSite !== null && (
        <Dialog open={selectedSite !== null} onOpenChange={handleCloseDialog}>
          <DialogContent className="sm:max-w-2xl">
            {selectedSiteData && (
              <div className="relative">
                <button 
                  onClick={handleCloseDialog}
                  className="absolute right-2 top-2 w-8 h-8 rounded-full flex items-center justify-center bg-white/80 hover:bg-white z-10"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="h-64 overflow-hidden rounded-t-lg">
                  <img 
                    src={selectedSiteData.imageUrl} 
                    alt={selectedSiteData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://placehold.co/800x400/terracotta/white?text=Cultural+Site";
                    }}
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-2">{selectedSiteData.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{selectedSiteData.location}</p>
                  <p className="mb-4">{selectedSiteData.description || selectedSiteData.shortDescription}</p>
                  
                  <div className="flex justify-between">
                    <button 
                      onClick={() => navigateToDetail(selectedSiteData.id)}
                      className="px-4 py-2 bg-terracotta text-white rounded-md hover:bg-terracotta/90 transition-colors"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={handleCloseDialog}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StoryCardList;
