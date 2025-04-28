
import React from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FestivalCalendar from '@/components/FestivalCalendar';
import ContributeForm from '@/components/ContributeForm';
import ChatBot from '@/components/ChatBot';
import { useLanguage } from '@/contexts/LanguageContext';

const Contributions: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-6 pb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2 text-primary">
          {t('communityTitle')}
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          {t('communityDesc')}
        </p>
        
        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="Calendar" 
                className="w-6 h-6 rounded-full object-cover"
              />
              {t('calendarTab')}
            </TabsTrigger>
            <TabsTrigger value="contribute" className="flex items-center gap-2">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Contribute" 
                className="w-6 h-6 rounded-full object-cover"
              />
              {t('contributeTab')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar" className="mt-0">
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
                alt="Festival Calendar"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </div>
            <FestivalCalendar />
          </TabsContent>
          
          <TabsContent value="contribute" className="mt-0">
            <div className="mb-6">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Community Contributions"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </div>
            <ContributeForm />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-secondary border-t border-muted py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t('astitvaTitle')}. {t('footerText')}
          </p>
        </div>
      </footer>
      
      <ChatBot />
    </div>
  );
};

export default Contributions;
