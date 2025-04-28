
import React, { useEffect, useRef } from 'react';
import { culturalSites } from '@/data/culturalData';
import "leaflet/dist/leaflet.css";

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    // Only import Leaflet on the client-side
    if (typeof window !== 'undefined' && mapRef.current && !leafletMapRef.current) {
      import('leaflet').then((L) => {
        // Initialize the map
        const map = L.map(mapRef.current!).setView([20.5937, 78.9629], 5);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Fix icon paths issue
        const icon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        
        // Add markers for each cultural site
        culturalSites.forEach(site => {
          const marker = L.marker([site.coordinates.lat, site.coordinates.lng], { icon }).addTo(map);
          
          // Create popup content with image and info
          const popupContent = document.createElement('div');
          popupContent.className = 'site-popup';
          
          // Add image
          const img = document.createElement('img');
          img.src = site.imageUrl;
          img.alt = site.name;
          img.className = 'w-full h-32 object-cover';
          img.onerror = () => {
            img.src = "https://placehold.co/400x300/terracotta/white?text=Cultural+Site";
          };
          popupContent.appendChild(img);
          
          // Add title and description
          const title = document.createElement('h3');
          title.textContent = site.name;
          title.className = 'font-serif font-semibold text-gray-900 mt-2';
          popupContent.appendChild(title);
          
          const location = document.createElement('p');
          location.textContent = site.location;
          location.className = 'text-xs text-gray-500';
          popupContent.appendChild(location);
          
          const desc = document.createElement('p');
          desc.textContent = site.shortDescription;
          desc.className = 'text-sm text-gray-700 mt-1 mb-2';
          popupContent.appendChild(desc);
          
          // Add explore button
          const button = document.createElement('button');
          button.textContent = 'Explore';
          button.className = 'w-full py-1.5 bg-terracotta text-white text-sm rounded-md hover:bg-terracotta/90 transition-colors';
          button.onclick = () => {
            window.location.href = `/detail/${site.id}`;
          };
          popupContent.appendChild(button);
          
          // Bind popup to marker
          marker.bindPopup(popupContent, { 
            maxWidth: 300,
            className: 'custom-popup'
          });
        });
        
        // Store map reference for cleanup
        leafletMapRef.current = map;
      });
    }
    
    // Cleanup function
    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative map-container overflow-hidden rounded-lg">
      <div ref={mapRef} className="w-full h-[400px] lg:h-[500px]" />
      <div className="absolute bottom-2 right-2 text-xs text-white bg-black/70 px-2 py-1 rounded">
        Interactive Map - Explore India's Cultural Heritage
      </div>
    </div>
  );
};

export default Map;
