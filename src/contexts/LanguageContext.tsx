
import React, { createContext, useState, useContext, useCallback } from 'react';

export type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

// Translations
const translations: Translations = {
  astitvaTitle: {
    en: 'The Essence of India',
    hi: 'भारत का सार'
  },
  exploreText: {
    en: 'Discover the vibrant cultural heritage and historical landmarks of India. Immerse yourself in captivating stories, traditions, and virtual tours.',
    hi: 'भारत की जीवंत सांस्कृतिक विरासत और ऐतिहासिक स्थलों की खोज करें। मनोरम कहानियों, परंपराओं और आभासी पर्यटन में डूब जाएं।'
  },
  interactiveMap: {
    en: 'Interactive Map',
    hi: 'इंटरैक्टिव मानचित्र'
  },
  exploreRegions: {
    en: 'Explore Regions',
    hi: 'क्षेत्रों का अन्वेषण करें'
  },
  festivalCalendar: {
    en: 'Festival Calendar',
    hi: 'त्योहार कैलेंडर'
  },
  contribute: {
    en: 'Contribute',
    hi: 'योगदान करें'
  },
  virtualTour: {
    en: 'Virtual Tour',
    hi: 'आभासी पर्यटन'
  },
  virtualTourDesc: {
    en: 'Experience India\'s cultural sites from the comfort of your home.',
    hi: 'अपने घर के आराम से भारत के सांस्कृतिक स्थलों का अनुभव करें।'
  },
  footerText: {
    en: 'All rights reserved.',
    hi: 'सर्वाधिकार सुरक्षित।'
  },
  home: {
    en: 'Home',
    hi: 'होम'
  },
  topRated: {
    en: 'Top Rated',
    hi: 'टॉप रेटेड'
  },
  insights: {
    en: 'Insights',
    hi: 'insights'
  },
  contributions: {
    en: 'Contributions',
    hi: 'योगदान'
  },
  categories: {
    en: 'Categories',
    hi: 'श्रेणियाँ'
  },
  monuments: {
    en: 'Monuments',
    hi: 'स्मारक'
  },
  festivals: {
    en: 'Festivals',
    hi: 'त्यौहार'
  },
  arts: {
    en: 'Arts',
    hi: 'कला'
  },
  heritageSites: {
    en: 'Heritage Sites',
    hi: 'विरासत स्थल'
  },
  didYouKnow: {
    en: 'Did you know?',
    hi: 'क्या तुम्हें पता था?'
  },
  regionNotFound: {
    en: 'Region Not Found',
    hi: 'क्षेत्र नहीं मिला'
  },
  regionNotFoundDescription: {
    en: 'The region you are looking for does not exist or may have been moved.',
    hi: 'आप जिस क्षेत्र की तलाश कर रहे हैं वह मौजूद नहीं है या स्थानांतरित किया गया हो सकता है।'
  },
  backToHome: {
    en: 'Back to Home',
    hi: 'होम पेज पर वापस जाएं'
  },
  popularPlacesIn: {
    en: 'Popular Places in',
    hi: 'में लोकप्रिय स्थान'
  },
  noSitesFound: {
    en: 'No Cultural Sites Found',
    hi: 'कोई सांस्कृतिक स्थल नहीं मिला'
  },
  noSitesFoundDescription: {
    en: 'We are still adding cultural sites to this region. Please check back later.',
    hi: 'हम इस क्षेत्र में अभी भी सांस्कृतिक स्थलों को जोड़ रहे हैं। कृपया बाद में फिर से जांचें।'
  },
  exploreMore: {
    en: 'Explore More',
    hi: 'और अन्वेषण करें'
  },
  // New filter-related translations
  filters: {
    en: 'Filters',
    hi: 'फिल्टर्स'
  },
  religions: {
    en: 'Religions',
    hi: 'धर्म'
  },
  cultures: {
    en: 'Cultures',
    hi: 'संस्कृतियां'
  },
  regions: {
    en: 'Regions',
    hi: 'क्षेत्र'
  },
  searchReligions: {
    en: 'Search religions...',
    hi: 'धर्मों की खोज करें...'
  },
  searchCultures: {
    en: 'Search cultures...',
    hi: 'संस्कृतियों की खोज करें...'
  },
  noReligionsFound: {
    en: 'No religions found',
    hi: 'कोई धर्म नहीं मिला'
  },
  noCulturesFound: {
    en: 'No cultures found',
    hi: 'कोई संस्कृति नहीं मिली'
  },
  clearFilters: {
    en: 'Clear Filters',
    hi: 'फिल्टर हटाएं'
  },
  noActiveFilters: {
    en: 'No active filters',
    hi: 'कोई सक्रिय फिल्टर नहीं'
  },
  activeFilter: {
    en: 'active filter',
    hi: 'सक्रिय फिल्टर'
  },
  activeFilters: {
    en: 'active filters',
    hi: 'सक्रिय फिल्टर्स'
  },
  filterResults: {
    en: 'Filter Results',
    hi: 'फ़िल्टर परिणाम'
  },
  clearAll: {
    en: 'Clear All',
    hi: 'सभी हटाएं'
  },
  noResultsFound: {
    en: 'No results found',
    hi: 'कोई परिणाम नहीं मिला'
  },
  resultFound: {
    en: 'result found',
    hi: 'परिणाम मिला'
  },
  resultsFound: {
    en: 'results found',
    hi: 'परिणाम मिले'
  },
  noMatchingResults: {
    en: 'No matching results',
    hi: 'कोई मिलान परिणाम नहीं'
  },
  tryDifferentFilters: {
    en: 'Try different filters or clear them to see more results',
    hi: 'अलग-अलग फ़िल्टर आज़माएँ या अधिक परिणाम देखने के लिए उन्हें साफ़ करें'
  },
  // Booking-related translations
  bookTickets: {
    en: 'Book Tickets',
    hi: 'टिकट बुक करें'
  },
  bookingTitle: {
    en: 'Monument Ticket Booking',
    hi: 'स्मारक टिकट बुकिंग'
  },
  fillBookingForm: {
    en: 'Fill in the form below to book tickets for your visit',
    hi: 'अपनी यात्रा के लिए टिकट बुक करने के लिए नीचे दिए गए फॉर्म को भरें'
  },
  monument: {
    en: 'Monument',
    hi: 'स्मारक'
  },
  selectMonument: {
    en: 'Select a monument',
    hi: 'एक स्मारक चुनें'
  },
  visitDate: {
    en: 'Visit Date',
    hi: 'यात्रा की तारीख'
  },
  selectDate: {
    en: 'Select a date',
    hi: 'एक तारीख चुनें'
  },
  ticketsAdvance: {
    en: 'Tickets can be booked up to 3 months in advance',
    hi: 'टिकट 3 महीने पहले तक बुक किए जा सकते हैं'
  },
  ticketType: {
    en: 'Ticket Type',
    hi: 'टिकट प्रकार'
  },
  selectTicketType: {
    en: 'Select ticket type',
    hi: 'टिकट प्रकार चुनें'
  },
  standardTicket: {
    en: 'Standard',
    hi: 'मानक'
  },
  studentTicket: {
    en: 'Student',
    hi: 'विद्यार्थी'
  },
  foreignerTicket: {
    en: 'Foreigner',
    hi: 'विदेशी'
  },
  seniorTicket: {
    en: 'Senior Citizen',
    hi: 'वरिष्ठ नागरिक'
  },
  ticketQuantity: {
    en: 'Number of Tickets',
    hi: 'टिकट की संख्या'
  },
  maxTickets: {
    en: 'Maximum 10 tickets per booking',
    hi: 'प्रति बुकिंग अधिकतम 10 टिकट'
  },
  fullName: {
    en: 'Full Name',
    hi: 'पूरा नाम'
  },
  email: {
    en: 'Email',
    hi: 'ईमेल'
  },
  phone: {
    en: 'Phone Number',
    hi: 'फोन नंबर'
  },
  completeBooking: {
    en: 'Complete Booking',
    hi: 'बुकिंग पूरी करें'
  },
  bookingSummary: {
    en: 'Booking Summary',
    hi: 'बुकिंग सारांश'
  },
  ticketTypeSummary: {
    en: 'Ticket Type:',
    hi: 'टिकट प्रकार:'
  },
  pricePerTicket: {
    en: 'Price per ticket:',
    hi: 'प्रति टिकट मूल्य:'
  },
  quantity: {
    en: 'Quantity:',
    hi: 'मात्रा:'
  },
  bookingFee: {
    en: 'Booking Fee:',
    hi: 'बुकिंग शुल्क:'
  },
  totalAmount: {
    en: 'Total Amount:',
    hi: 'कुल राशि:'
  },
  bookingInstantConfirmation: {
    en: 'Booking is confirmed instantly',
    hi: 'बुकिंग तुरंत पुष्टि की जाती है'
  },
  freeCancellation: {
    en: 'Free cancellation up to 24 hours before visit',
    hi: 'यात्रा से 24 घंटे पहले तक मुफ्त रद्दीकरण'
  },
  idRequired: {
    en: 'Please bring your ID for student/senior discounts',
    hi: 'कृपया छात्र/वरिष्ठ छूट के लिए अपना आईडी लेकर आएं'
  },
  securePayment: {
    en: 'Secure payment',
    hi: 'सुरक्षित भुगतान'
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: string) => {
    return translations[key]?.[language] || `Missing translation for ${key} in ${language}`;
  }, [language]);

  const value: LanguageContextProps = {
    language,
    setLanguage: (lang: Language) => setLanguage(lang),
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
