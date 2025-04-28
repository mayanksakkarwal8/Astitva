
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  Users, 
  Info, 
  Heart, 
  Share,
  Ticket
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { culturalSites } from '@/data/culturalData';
import PronunciationButton from '@/components/PronunciationButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import DirectionsButton from '@/components/DirectionsButton';

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [site, setSite] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundSite = culturalSites.find(site => site.id === id);
      setSite(foundSite || null);
      setIsLoading(false);
    }, 500);
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!site) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-serif font-semibold mb-4">Site Not Found</h2>
          <p className="mb-6">The cultural site you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="text-terracotta hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

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

  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Image */}
        <div className="relative h-80 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
          <img 
            src={site.imageUrl} 
            alt={site.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/1200x500/terracotta/white?text=Cultural+Site";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge className={`${getCategoryColor(site.category)}`}>
                {site.category.charAt(0).toUpperCase() + site.category.slice(1)}
              </Badge>
              <Badge variant="outline" className="text-white border-white">
                {site.region}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              {site.name}
            </h1>
            
            <div className="flex items-center text-sm mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{site.location}</span>
              <div className="ml-4 flex items-center">
                <Star className="w-4 h-4 text-gold fill-current mr-1" />
                <span>{site.rating}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <PronunciationButton text={site.name} />
              <DirectionsButton 
                destination={`${site.name}, ${site.location}`}
                lat={site.coordinates?.lat}
                lng={site.coordinates?.lng}
              />
              <Button variant="outline" size="sm" className="text-white border-white bg-white/10 backdrop-blur-sm hover:bg-white/20">
                <Heart className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="text-white border-white bg-white/10 backdrop-blur-sm hover:bg-white/20">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
        
        {/* Content Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Info Sidebar */}
          <div className="md:col-span-1 order-2 md:order-1">
            <div className="bg-card shadow-sm rounded-xl overflow-hidden sticky top-24">
              <div className="p-5 bg-muted">
                <h3 className="font-serif font-semibold text-xl">Quick Info</h3>
              </div>
              
              <div className="divide-y">
                <div className="p-4 flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-terracotta flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Best Time to Visit</p>
                    <p className="text-sm text-muted-foreground">{site.bestTimeToVisit || "All year round"}</p>
                  </div>
                </div>
                
                <div className="p-4 flex items-start">
                  <Clock className="w-5 h-5 mr-3 text-terracotta flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Opening Hours</p>
                    <p className="text-sm text-muted-foreground">{site.openingHours || "Not specified"}</p>
                  </div>
                </div>
                
                <div className="p-4 flex items-start">
                  <Users className="w-5 h-5 mr-3 text-terracotta flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Typical Visit Duration</p>
                    <p className="text-sm text-muted-foreground">{site.visitDuration || "2-3 hours"}</p>
                  </div>
                </div>
                
                <div className="p-4 flex items-start">
                  <Ticket className="w-5 h-5 mr-3 text-terracotta flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Entry Fee</p>
                    <p className="text-sm text-muted-foreground">{site.entryFee || "Free entry"}</p>
                  </div>
                </div>
                
                <div className="p-4 flex items-start">
                  <Info className="w-5 h-5 mr-3 text-terracotta flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Established</p>
                    <p className="text-sm text-muted-foreground">{site.established || "Unknown"}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <Link 
                    to="/booking" 
                    className="block w-full py-2 bg-terracotta text-white text-center rounded-md hover:bg-terracotta/90 transition-colors"
                  >
                    Book Tickets
                  </Link>
                  
                  <DirectionsButton
                    destination={`${site.name}, ${site.location}`}
                    lat={site.coordinates?.lat}
                    lng={site.coordinates?.lng}
                    className="w-full mt-2 border-terracotta text-terracotta hover:bg-terracotta/5"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2 order-1 md:order-2">
            <Tabs defaultValue="overview">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="architecture">Architecture</TabsTrigger>
                <TabsTrigger value="visit">Plan Your Visit</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="lead">{site.shortDescription}</p>
                  <p>{site.description}</p>
                  
                  <h3>Cultural Significance</h3>
                  <p>{site.culturalSignificance || "Information about cultural significance will be added soon."}</p>
                  
                  <div className="not-prose">
                    <h3 className="text-xl font-serif font-semibold mt-6 mb-4">Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1, 2, 3, 4, 5, 6].map(index => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden">
                          <img 
                            src={`https://source.unsplash.com/random/300x300?${site.name.toLowerCase().split(' ').join(',')}&sig=${index}`} 
                            alt={`${site.name} - ${index}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = "https://placehold.co/300x300/terracotta/white?text=Photo";
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* History Tab */}
              <TabsContent value="history" className="mt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Historical Background</h3>
                  <p>{site.history || "Detailed history information will be added soon."}</p>
                  
                  <h3>Timeline</h3>
                  <div className="not-prose">
                    <div className="space-y-4">
                      {(site.timeline || [
                        { year: "Unknown", event: "Construction began" },
                        { year: "Unknown", event: "Completion" },
                        { year: "Modern Era", event: "Recognized as a cultural landmark" }
                      ]).map((item: any, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="w-20 flex-shrink-0 font-semibold">{item.year}</div>
                          <div className="flex-1 border-l-2 border-muted pl-4 pb-4">
                            <p>{item.event}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Architecture Tab */}
              <TabsContent value="architecture" className="mt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Architectural Style</h3>
                  <p>{site.architecture?.style || "The architectural style details will be added soon."}</p>
                  
                  <h3>Key Features</h3>
                  <ul>
                    {(site.architecture?.features || [
                      "Detailed information about architectural features will be added soon."
                    ]).map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  
                  <h3>Materials Used</h3>
                  <p>{site.architecture?.materials || "Information about materials used in construction will be added soon."}</p>
                </div>
              </TabsContent>
              
              {/* Plan Your Visit Tab */}
              <TabsContent value="visit" className="mt-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>How to Reach</h3>
                  <p>
                    {site.howToReach || "Detailed information about how to reach this site will be added soon."}
                  </p>
                  
                  <div className="not-prose">
                    <h3 className="text-xl font-serif font-semibold mt-6 mb-4">Nearby Attractions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(site.nearbyAttractions || [
                        { name: "Nearby attraction 1", distance: "5 km" },
                        { name: "Nearby attraction 2", distance: "8 km" },
                        { name: "Nearby attraction 3", distance: "12 km" }
                      ]).map((attraction: any, index: number) => (
                        <div key={index} className="flex items-center p-4 border rounded-lg">
                          <MapPin className="w-5 h-5 text-terracotta mr-3" />
                          <div>
                            <p className="font-medium">{attraction.name}</p>
                            <p className="text-sm text-muted-foreground">Distance: {attraction.distance}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="text-xl font-serif font-semibold mt-6 mb-4">Visitor Tips</h3>
                    <div className="space-y-2">
                      {(site.visitorTips || [
                        "Avoid visiting during peak hours for a better experience.",
                        "Carry water and wear comfortable shoes.",
                        "Photography may be restricted in certain areas."
                      ]).map((tip: string, index: number) => (
                        <div key={index} className="flex items-start p-3 bg-muted rounded-lg">
                          <Info className="w-5 h-5 text-terracotta mr-3 flex-shrink-0 mt-0.5" />
                          <p>{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
