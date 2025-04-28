
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Star, Lightbulb } from 'lucide-react';
import { regions, culturalSites, culturalInsights } from '@/data/culturalData';

const SideBar: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('regions');

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Get top rated sites (rating 4.8 or higher)
  const topRatedSites = culturalSites
    .filter(site => site.rating >= 4.8)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  // Get random insight
  const randomInsightIndex = Math.floor(Math.random() * culturalInsights.length);
  const randomInsight = culturalInsights[randomInsightIndex];

  return (
    <div className="w-full lg:w-64 bg-sidebar dark:bg-sidebar-background rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
      {/* Regions Section */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <button
          className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => toggleSection('regions')}
        >
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-3 text-terracotta" />
            <span>Explore by Region</span>
          </div>
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedSection === 'regions' ? 'transform rotate-90' : ''
            }`}
          />
        </button>
        
        {expandedSection === 'regions' && (
          <div className="px-4 py-2 pb-4 animate-fade-in">
            <ul className="space-y-1">
              {regions.map(region => (
                <li key={region.id}>
                  <Link
                    to={`/region/${region.id}`}
                    className="block px-3 py-2 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Top Rated Places Section */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <button
          className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => toggleSection('top-rated')}
        >
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-3 text-gold" />
            <span>Top Rated Places</span>
          </div>
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedSection === 'top-rated' ? 'transform rotate-90' : ''
            }`}
          />
        </button>
        
        {expandedSection === 'top-rated' && (
          <div className="px-4 py-2 pb-4 animate-fade-in">
            <ul className="space-y-3">
              {topRatedSites.map(site => (
                <li key={site.id} className="flex items-center">
                  <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={site.imageUrl} 
                      alt={site.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://placehold.co/400x300/terracotta/white?text=Cultural+Site";
                      }}  
                    />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <Link
                      to={`/detail/${site.id}`}
                      className="block text-sm font-medium text-gray-800 dark:text-gray-200 truncate hover:text-primary transition-colors"
                    >
                      {site.name}
                    </Link>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{site.location}</p>
                  </div>
                  <div className="flex items-center ml-2">
                    <Star className="w-3 h-3 text-gold fill-current" />
                    <span className="text-xs font-medium ml-1">{site.rating}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/top-rated"
              className="block mt-3 text-xs text-center text-primary font-medium hover:underline"
            >
              View All Top Rated Places
            </Link>
          </div>
        )}
      </div>

      {/* Cultural Insights Section */}
      <div>
        <button
          className="w-full flex items-center justify-between px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          onClick={() => toggleSection('insights')}
        >
          <div className="flex items-center">
            <Lightbulb className="w-4 h-4 mr-3 text-emerald" />
            <span>Cultural Insights</span>
          </div>
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-200 ${
              expandedSection === 'insights' ? 'transform rotate-90' : ''
            }`}
          />
        </button>
        
        {expandedSection === 'insights' && (
          <div className="px-4 py-3 animate-fade-in">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              <h5 className="text-sm font-medium text-deepBlue dark:text-gold mb-1">{randomInsight.title}</h5>
              <p className="text-xs text-gray-600 dark:text-gray-300">{randomInsight.content}</p>
            </div>
            <Link
              to="/insights"
              className="block mt-3 text-xs text-center text-primary font-medium hover:underline"
            >
              View More Insights
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
