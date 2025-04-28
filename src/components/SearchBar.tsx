
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { culturalSites } from '@/data/culturalData';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof culturalSites>([]);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 1) {
      const results = culturalSites.filter(site => 
        site.name.toLowerCase().includes(term.toLowerCase()) || 
        site.location.toLowerCase().includes(term.toLowerCase()) ||
        site.category.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setIsActive(true);
    } else {
      setSearchResults([]);
      setIsActive(false);
    }
  };

  const handleResultClick = (site: (typeof culturalSites)[0]) => {
    // Navigate to detail page
    navigate(`/detail/${site.id}`);
    
    // Reset search state
    setSearchTerm('');
    setSearchResults([]);
    setIsActive(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search monuments, festivals, arts..."
          className="w-full md:w-[400px] px-4 py-2 pr-10 rounded-full border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          onFocus={() => searchTerm.length > 1 && setIsActive(true)}
          onBlur={() => setTimeout(() => setIsActive(false), 200)}
        />
        <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
      </div>

      {isActive && searchResults.length > 0 && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden z-50 animate-fade-in glass-card">
          <ul className="py-2 max-h-[300px] overflow-y-auto">
            {searchResults.map((site) => (
              <li 
                key={site.id}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors flex items-center gap-3"
                onClick={() => handleResultClick(site)}
              >
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
                <div>
                  <p className="font-medium">{site.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {site.location}
                    <span className="ml-2 px-2 py-0.5 text-[10px] bg-muted rounded-full">
                      {site.category}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isActive && searchTerm.length > 1 && searchResults.length === 0 && (
        <div className="absolute mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-50 animate-fade-in glass-card">
          <p className="text-center text-gray-500">No results found</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
