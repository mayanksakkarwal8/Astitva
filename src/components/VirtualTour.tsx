
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, PlayCircle, ExternalLink } from 'lucide-react';

const virtualTourImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400&q=80',
    title: 'Taj Mahal - Iconic Marble Mausoleum',
    location: 'Agra, Uttar Pradesh',
    tourLink: 'https://www.360panoramas.co.uk/17/467/Taj_Mahal'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400&q=80',
    title: 'Hawa Mahal - Palace of Winds',
    location: 'Jaipur, Rajasthan',
    tourLink: 'http://www.360cities.net/image/jaipur-hawa-mahal-facade#30.62,16.29,110.0'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1621351683756-3f30a45c6aca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400&q=80',
    title: 'Meenakshi Temple - Ancient Hindu Temple',
    location: 'Madurai, Tamil Nadu',
    tourLink: 'https://www.view360.in/vtour-3dvr-madurai.html'
  }
];

const VirtualTour: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % virtualTourImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % virtualTourImages.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + virtualTourImages.length) % virtualTourImages.length);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const openVirtualTour = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`relative overflow-hidden rounded-xl ${isFullScreen ? 'fixed inset-0 z-50 bg-black' : 'h-[400px]'}`}>
      {/* Slideshow */}
      <div className="relative h-full overflow-hidden">
        {virtualTourImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-serif font-semibold mb-1">{image.title}</h3>
              <p className="text-sm text-gray-200 mb-2">{image.location}</p>
              <button 
                onClick={() => openVirtualTour(image.tourLink)}
                className="flex items-center space-x-2 bg-primary/90 hover:bg-primary px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <span>Experience 360° View</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isPlaying ? (
            <span className="w-4 h-4 border-l-2 border-r-2 border-white"></span>
          ) : (
            <PlayCircle className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={toggleFullScreen}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          aria-label={isFullScreen ? 'Exit full screen' : 'Enter full screen'}
        >
          {isFullScreen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Thumbnail indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {virtualTourImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VirtualTour;
