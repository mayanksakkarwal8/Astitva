
import React from 'react';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { culturalSites } from '@/data/culturalData';
import ChatBot from '@/components/ChatBot';

const TopRatedPlaces: React.FC = () => {
  // Get all sites sorted by rating
  const ratedSites = [...culturalSites]
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-2">
            <span className="text-terracotta">Top Rated</span> Cultural Sites
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Explore India's highest-rated cultural and heritage destinations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ratedSites.map(site => (
            <div key={site.id} className="glass-card overflow-hidden rounded-xl hover-lift">
              <div className="relative h-56 overflow-hidden">
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
                  <div className="flex items-center bg-white px-3 py-1 rounded-full shadow">
                    <Star className="w-4 h-4 text-gold fill-current mr-1" />
                    <span className="font-medium">{site.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-serif font-semibold text-xl mb-2">{site.name}</h3>
                
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{site.location}</span>
                </div>
                
                <p className="text-foreground mb-4 line-clamp-3">
                  {site.shortDescription}
                </p>
                
                <Link 
                  to={`/detail/${site.id}`}
                  className="inline-flex items-center text-primary font-medium hover:underline"
                >
                  Explore Details
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <footer className="bg-secondary border-t border-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Astitva - The Cultural and Rituals Aspects of India. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default TopRatedPlaces;
