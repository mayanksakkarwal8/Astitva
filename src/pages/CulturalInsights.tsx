
import React, { useState } from 'react';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { culturalInsights } from '@/data/culturalData';
import { useLanguage } from '@/contexts/LanguageContext';

const CulturalInsights: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useLanguage();
  
  // Filter insights based on search term
  const filteredInsights = searchTerm.length > 0
    ? culturalInsights.filter(insight => 
        insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : culturalInsights;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <a href="/" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('home')}
          </a>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-2 text-deepBlue">
            <span className="text-terracotta">{t('culturalInsightsTitle')}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {t('culturalInsightsDesc')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchInsights')}
            className="w-full md:w-1/2 px-4 py-2 rounded-full border-none bg-white/80 backdrop-blur-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map(insight => (
            <div key={insight.id} className="glass-card p-6 rounded-lg hover-lift">
              <div className="flex items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-emerald" />
                </div>
                <h3 className="font-serif font-semibold text-lg ml-3 text-gray-900">
                  {insight.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {insight.content}
              </p>
            </div>
          ))}
        </div>

        {filteredInsights.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No insights found matching "{searchTerm}"</p>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {t('astitvaTitle')}. {t('footerText')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CulturalInsights;
