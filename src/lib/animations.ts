
import { cn } from '@/lib/utils';

// Define animation classes
export const ANIMATIONS = {
  fadeIn: 'animate-fade-in',
  fadeOut: 'animate-fade-out',
  slideIn: 'animate-slide-in',
  slideOut: 'animate-slide-out',
  zoomIn: 'animate-zoom-in',
  float: 'animate-float',
  pulseSoft: 'animate-pulse-soft',
  rotateGlobe: 'animate-rotate-globe'
};

// Animation utility function
export const withAnimation = (baseClasses: string, animation: keyof typeof ANIMATIONS) => {
  return cn(baseClasses, ANIMATIONS[animation]);
};
