
import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Set up progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        // Gradually accelerate progress
        const increment = prev < 30 ? 3 : prev < 60 ? 5 : prev < 85 ? 2 : 0.5;
        const newProgress = prev + increment;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);
    
    // Begin fade out after 2.5 seconds
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    // Hide loader after 3 seconds
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-white z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/b9d75b12-2717-4972-a219-18db3dd5ea19.png" 
          alt="Astitva Logo" 
          className="h-40 w-auto animate-scale-in"
        />
        <div className="mt-4 text-center animate-fade-in">
          <h1 className="text-3xl font-serif font-bold">
            <span className="text-terracotta">Astitva</span>
          </h1>
          <p className="text-sm text-gray-600 italic">
            The Cultural and Rituals Aspects of India
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-gray-200 rounded-full mt-8 overflow-hidden">
          <div 
            className="h-full bg-terracotta rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Percentage Display */}
        <p className="text-sm text-gray-500 mt-2">{Math.round(progress)}%</p>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <div className="h-2 w-2 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="h-2 w-2 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="h-2 w-2 bg-terracotta rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      
      <p className="absolute bottom-8 text-sm text-gray-400 animate-pulse">
        Exploring India's Cultural Treasures...
      </p>
    </div>
  );
};

export default LoadingScreen;
