
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/contexts/LanguageContext';
import { regions, culturalSites, CulturalSite } from '@/data/culturalData';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const RegionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [regionSites, setRegionSites] = useState<CulturalSite[]>([]);
  const [currentRegion, setCurrentRegion] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const region = regions.find(r => r.id === id);
      if (region) {
        setCurrentRegion(region);
        const sites = culturalSites.filter(site => site.regionId === id);
        setRegionSites(sites);
      }
    }
  }, [id]);

  if (!currentRegion) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-6 pb-12">
          <div className="text-center py-12">
            <h2 className="text-2xl font-serif font-semibold mb-2">{t('regionNotFound')}</h2>
            <p className="text-muted-foreground">{t('regionNotFoundDescription')}</p>
            <Link to="/" className="mt-6 inline-block">
              <Button>{t('backToHome')}</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-6 pb-12">
        <div className="flex items-center space-x-2 mb-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            {t('home')}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm font-medium">{currentRegion.name}</span>
        </div>
        
        <div className="bg-gradient-to-r from-terracotta/10 to-primary/5 rounded-xl p-6 mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3">
            <span className="text-terracotta">{currentRegion.name}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-4">
            {currentRegion.description}
          </p>
        </div>
        
        <h2 className="text-2xl font-serif font-semibold mb-6">
          {t('popularPlacesIn')} {currentRegion.name}
        </h2>
        
        {regionSites.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-medium mb-2">{t('noSitesFound')}</h3>
            <p className="text-muted-foreground mb-4">{t('noSitesFoundDescription')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionSites.map((site) => (
              <Card key={site.id} className="overflow-hidden hover-lift transition-all">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={site.imageUrl} 
                    alt={site.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://placehold.co/600x400/terracotta/white?text=Cultural+Site";
                    }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-serif">{site.name}</CardTitle>
                    <div className="flex items-center text-gold">
                      <Star className="h-4 w-4 fill-current mr-1" />
                      <span className="text-sm font-medium">{site.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="flex items-center text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {site.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm line-clamp-3">{site.shortDescription}</p>
                </CardContent>
                <CardFooter>
                  <Link to={`/detail/${site.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      {t('exploreMore')}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <footer className="bg-secondary border-t border-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t('astitvaTitle')}. {t('footerText')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RegionDetail;
