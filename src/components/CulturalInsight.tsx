
import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';
import { culturalInsights } from '@/data/culturalData';
import { useLanguage } from '@/contexts/LanguageContext';

const CulturalInsight: React.FC = () => {
  const [currentInsight, setCurrentInsight] = useState(culturalInsights[0]);
  const [isChanging, setIsChanging] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsChanging(true);
      
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * culturalInsights.length);
        setCurrentInsight(culturalInsights[randomIndex]);
        setIsChanging(false);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-4 rounded-lg transition-all duration-500 hover-lift">
      <div className="flex items-start space-x-3">
        <div className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center flex-shrink-0">
          <Lightbulb className="w-5 h-5 text-emerald" />
        </div>
        <div className={`transition-opacity duration-500 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
          <h3 className="text-base font-medium mb-1 text-gray-900 dark:text-white">{t('didYouKnow')}</h3>
          <h4 className="text-sm font-medium mb-1 text-deepBlue dark:text-gold">{currentInsight.title}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-300">{currentInsight.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CulturalInsight;
