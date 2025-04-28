
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import Map from '@/components/Map';
import StoryCardList from '@/components/StoryCardList';
import VirtualTour from '@/components/VirtualTour';
import RegionExplorer from '@/components/RegionExplorer';
import LoadingScreen from '@/components/LoadingScreen';
import ChatBot from '@/components/ChatBot';
import { CalendarDays, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Index: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <LoadingScreen />
      <Navbar />
      
      <main className="container mx-auto px-4 pt-6 pb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
          <span className="text-terracotta">Astitva</span> - <span className="text-primary">{t('astitvaTitle')}</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          {t('exploreText')}
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 lg:flex-shrink-0 order-2 lg:order-1">
            <SideBar />
          </aside>
          
          {/* Main content */}
          <div className="flex-1 order-1 lg:order-2">
            <section className="mb-12">
              <h2 className="section-title">{t('interactiveMap')}</h2>
              <Map />
            </section>
            
            <section className="mb-12">
              <StoryCardList />
            </section>
            
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="section-title mb-0">{t('exploreRegions')}</h2>
              </div>
              <RegionExplorer />
            </section>
            
            <section className="mb-8">
              <h2 className="section-title">{t('virtualTour')}</h2>
              <VirtualTour />
              <p className="mt-3 text-sm text-muted-foreground text-center">
                {t('virtualTourDesc')}
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <footer className="bg-secondary border-t border-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t('astitvaTitle')}. {t('footerText')}
          </p>
        </div>
      </footer>
      
      {/* ChatBot Component */}
      <ChatBot />
    </div>
  );
};

export default Index;
