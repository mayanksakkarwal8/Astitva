import React, { useState } from 'react';
import { Menu, X, User, Ticket, Calendar, Heart } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import FilterOptions from './FilterOptions';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    region?: string;
    culture?: string;
    religion?: string;
    category?: string;
  }>({});
  
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'clear') {
      setActiveFilters({});
      // If we're on a filtered page, navigate back to home
      if (location.pathname.includes('/filter')) {
        navigate('/');
      }
      return;
    }

    const newFilters = { ...activeFilters };
    
    if (newFilters[filterType as keyof typeof newFilters] === value) {
      // Toggle off if clicking the same value
      delete newFilters[filterType as keyof typeof newFilters];
    } else {
      // Set new value
      newFilters[filterType as keyof typeof newFilters] = value;
    }
    
    setActiveFilters(newFilters);

    // Create query string from active filters
    const queryParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) queryParams.set(key, val);
    });

    // Navigate to filtered view with query params
    navigate(`/filter?${queryParams.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-muted shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img alt="Astitva Logo" className="h-20 w-30" src="/lovable-uploads/e53baf19-b092-4b75-af72-d07bce3349e3.png" />
            <div className="hidden md:block">
              <span className="text-xl font-serif font-bold"></span>
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            {/* Festival Calendar Link */}
            <Link 
              to="/insights?tab=festivals" 
              className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-secondary transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Festival Calendar</span>
            </Link>
            
            {/* Contribute Link */}
            <Link 
              to="/contributions" 
              className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-secondary transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span>Contribute</span>
            </Link>
            
            {/* E-Booking Link */}
            <Link 
              to="/booking" 
              className="hidden md:flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-secondary transition-colors"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Tickets</span>
            </Link>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Filter Button with Options */}
            <FilterOptions 
              onFilterChange={handleFilterChange} 
              activeFilters={activeFilters}
            />

            {/* User Profile */}
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <User className="w-5 h-5" />
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 animate-fade-in">
            <div className="mb-2 flex items-center">
              <img src="/lovable-uploads/b9d75b12-2717-4972-a219-18db3dd5ea19.png" alt="Astitva Logo" className="h-4 w-auto mr-2" />
              <div>
                <span className="text-lg font-serif font-bold">
                  <span className="text-terracotta">Astitva</span>
                </span>
                <p className="text-xs text-muted-foreground italic">{t('astitvaTitle')}</p>
              </div>
            </div>
            <SearchBar className="mb-4" />
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 hover:bg-secondary rounded-lg">
                {t('home')}
              </Link>
              <Link to="/top-rated" className="px-4 py-2 hover:bg-secondary rounded-lg">
                {t('topRated')}
              </Link>
              <Link to="/insights" className="px-4 py-2 hover:bg-secondary rounded-lg">
                {t('insights')}
              </Link>
              <Link to="/booking" className="px-4 py-2 hover:bg-secondary rounded-lg flex items-center gap-2">
                <Ticket className="w-4 h-4" />
                <span>Book Tickets</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
