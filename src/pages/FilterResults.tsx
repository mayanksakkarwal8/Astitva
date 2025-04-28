
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { culturalSites, CulturalSite, religions, cultures, regions } from '@/data/culturalData';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import ChatBot from '@/components/ChatBot';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FilterResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [filteredSites, setFilteredSites] = useState<CulturalSite[]>([]);
  const [activeFilters, setActiveFilters] = useState<{
    region?: string;
    culture?: string;
    religion?: string;
    category?: string;
  }>({});

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newFilters: {
      region?: string;
      culture?: string;
      religion?: string;
      category?: string;
    } = {};
    
    // Extract filters from URL
    ['region', 'culture', 'religion', 'category'].forEach(filterType => {
      const value = queryParams.get(filterType);
      if (value) newFilters[filterType as keyof typeof newFilters] = value;
    });
    
    setActiveFilters(newFilters);
    
    // Filter sites based on active filters
    const results = culturalSites.filter(site => {
      if (newFilters.region && site.regionId !== newFilters.region) return false;
      if (newFilters.culture && site.culture !== newFilters.culture) return false;
      if (newFilters.religion && site.religion !== newFilters.religion) return false;
      if (newFilters.category && site.category !== newFilters.category) return false;
      return true;
    });
    
    setFilteredSites(results);
  }, [location.search]);

  const getFilterLabel = (type: string, value: string) => {
    switch (type) {
      case 'region':
        return regions.find(r => r.id === value)?.name || value;
      case 'culture':
        return cultures.find(c => c.id === value)?.name || value;
      case 'religion':
        return religions.find(r => r.id === value)?.name || value;
      case 'category':
        return value.charAt(0).toUpperCase() + value.slice(1);
      default:
        return value;
    }
  };

  const removeFilter = (filterType: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterType as keyof typeof newFilters];
    
    // Create new query string
    const queryParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) queryParams.set(key, val);
    });
    
    if (queryParams.toString() === '') {
      navigate('/');
    } else {
      navigate(`/filter?${queryParams.toString()}`);
    }
  };

  const clearAllFilters = () => {
    navigate('/');
  };

  return (
    <div>
      <Navbar />
      
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <SideBar />
          </div>
          
          {/* Main content */}
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-serif font-bold mb-2">{t('filterResults')}</h1>
              
              {/* Active filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(activeFilters).map(([type, value]) => (
                  <Badge key={type} variant="outline" className="pl-3 flex items-center gap-1">
                    <span className="text-xs text-muted-foreground mr-1">{type}:</span>
                    {getFilterLabel(type, value)}
                    <button 
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                      onClick={() => removeFilter(type)}
                    >
                      <FilterX className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                
                {Object.keys(activeFilters).length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters} 
                    className="text-xs h-7"
                  >
                    {t('clearAll')}
                  </Button>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <p className="text-muted-foreground">
                {filteredSites.length === 0 
                  ? t('noResultsFound') 
                  : `${filteredSites.length} ${filteredSites.length === 1 ? t('resultFound') : t('resultsFound')}`}
              </p>
            </div>
            
            {/* Results grid */}
            {filteredSites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSites.map(site => (
                  <div 
                    key={site.id} 
                    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover-lift cursor-pointer"
                    onClick={() => navigate(`/detail/${site.id}`)}
                  >
                    <div className="h-40 overflow-hidden">
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
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif font-semibold">{site.name}</h3>
                        <Badge 
                          className={`
                            ${site.category === 'monument' ? 'bg-terracotta' : ''}
                            ${site.category === 'festival' ? 'bg-gold' : ''}
                            ${site.category === 'art' ? 'bg-emerald' : ''}
                            ${site.category === 'heritage' ? 'bg-deepBlue' : ''}
                          `}
                        >
                          {site.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{site.location}</p>
                      <p className="text-sm line-clamp-2">{site.shortDescription}</p>
                      
                      <div className="mt-3 flex flex-wrap gap-1">
                        {site.religion && (
                          <Badge variant="outline" className="text-xs">
                            {religions.find(r => r.id === site.religion)?.name || site.religion}
                          </Badge>
                        )}
                        {site.culture && (
                          <Badge variant="outline" className="text-xs">
                            {cultures.find(c => c.id === site.culture)?.name || site.culture}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FilterX className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">{t('noMatchingResults')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('tryDifferentFilters')}
                </p>
                <Button 
                  variant="outline" 
                  onClick={clearAllFilters} 
                >
                  {t('clearFilters')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <ChatBot />
    </div>
  );
};

export default FilterResults;
