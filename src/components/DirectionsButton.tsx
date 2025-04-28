
import React, { useState } from 'react';
import { Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DirectionsButtonProps {
  destination: string;
  lat?: number;
  lng?: number;
  className?: string;
}

const DirectionsButton: React.FC<DirectionsButtonProps> = ({ 
  destination, 
  lat, 
  lng,
  className = "" 
}) => {
  const [loading, setLoading] = useState(false);

  const getDirections = () => {
    setLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Destination can be either coordinates or a search query
          const destinationParam = (lat && lng) 
            ? `${lat},${lng}` 
            : encodeURIComponent(destination);
          
          // Create directions URL based on device
          let directionsUrl;
          
          // Check if it's iOS
          if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            directionsUrl = `maps://maps.apple.com/?saddr=${latitude},${longitude}&daddr=${destinationParam}`;
          } 
          // Check if it's Android
          else if (/android/i.test(navigator.userAgent)) {
            directionsUrl = `geo:${latitude},${longitude}?q=${destinationParam}`;
          } 
          // Default to Google Maps for other devices
          else {
            directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destinationParam}`;
          }
          
          // Open directions in a new tab
          window.open(directionsUrl, '_blank');
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
          
          // Fallback for location error
          const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
          window.open(fallbackUrl, '_blank');
          
          // Show error message
          toast.error('Could not access your location', {
            description: 'Using search directions instead',
          });
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      // Fallback for browsers that don't support geolocation
      setLoading(false);
      const fallbackUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
      window.open(fallbackUrl, '_blank');
      
      toast.error('Geolocation is not supported by your browser', {
        description: 'Using search directions instead',
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className={`flex items-center gap-2 ${className}`} 
      onClick={getDirections}
      disabled={loading}
    >
      <Navigation className="h-4 w-4" />
      {loading ? 'Getting Directions...' : 'Get Directions'}
    </Button>
  );
};

export default DirectionsButton;
