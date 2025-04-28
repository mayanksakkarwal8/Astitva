
import { uuid } from '@/lib/utils';

export interface Region {
  id: string;
  name: string;
  description?: string;
}

export interface Religion {
  id: string;
  name: string;
}

export interface Culture {
  id: string;
  name: string;
}

export interface CulturalInsight {
  id: string;
  title: string;
  content: string;
  category: string;
}

export interface CulturalSite {
  id: string;
  name: string;
  category: string;
  location: string;
  region: string;
  shortDescription: string;
  description?: string;
  culturalSignificance?: string;
  history?: string;
  imageUrl: string;
  rating: number;
  isFeatured: boolean;
  bestTimeToVisit?: string;
  openingHours?: string;
  visitDuration?: string;
  entryFee?: string;
  established?: string;
  howToReach?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timeline?: Array<{
    year: string;
    event: string;
  }>;
  architecture?: {
    style: string;
    features: string[];
    materials: string;
  };
  nearbyAttractions?: Array<{
    name: string;
    distance: string;
  }>;
  visitorTips?: string[];
}

// Regions data
export const regions: Region[] = [
  { id: 'north', name: 'North' },
  { id: 'south', name: 'South' },
  { id: 'east', name: 'East' },
  { id: 'west', name: 'West' },
  { id: 'central', name: 'Central' },
  { id: 'northeast', name: 'Northeast' },
  { id: 'panIndia', name: 'Pan-India' }
];

// Religions data
export const religions: Religion[] = [
  { id: 'hinduism', name: 'Hinduism' },
  { id: 'islam', name: 'Islam' },
  { id: 'christianity', name: 'Christianity' },
  { id: 'sikhism', name: 'Sikhism' },
  { id: 'buddhism', name: 'Buddhism' },
  { id: 'jainism', name: 'Jainism' },
  { id: 'zoroastrianism', name: 'Zoroastrianism' }
];

// Cultures data
export const cultures: Culture[] = [
  { id: 'punjabi', name: 'Punjabi' },
  { id: 'bengali', name: 'Bengali' },
  { id: 'rajasthani', name: 'Rajasthani' },
  { id: 'tamil', name: 'Tamil' },
  { id: 'malayali', name: 'Malayali' },
  { id: 'gujarati', name: 'Gujarati' },
  { id: 'maharashtrian', name: 'Maharashtrian' }
];

// Cultural Sites data
export const culturalSites: CulturalSite[] = [
  {
    id: 'taj-mahal',
    name: 'Taj Mahal',
    category: 'monument',
    location: 'Agra, Uttar Pradesh',
    region: 'North India',
    shortDescription: 'An ivory-white marble mausoleum built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal.',
    description: 'The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself. The tomb is the centerpiece of a 17-hectare (42-acre) complex, which includes a mosque and a guest house, and is set in formal gardens bounded on three sides by a crenellated wall.',
    culturalSignificance: 'The Taj Mahal is considered to be the greatest architectural achievement in the whole range of Indo-Islamic architecture. Its recognized architectonic beauty has a rhythmic combination of solids and voids, concave and convex and light shadow; such as arches and domes further increases the aesthetic aspect. Not a piece of architecture, as other buildings are, but the proud passions of an emperor\'s love wrought in living stones.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3',
    rating: 4.9,
    isFeatured: true,
    bestTimeToVisit: 'October to March',
    openingHours: 'Sunrise to Sunset (Closed on Fridays)',
    visitDuration: '2-3 hours',
    entryFee: '₹50 for Indians, ₹1100 for foreigners',
    established: '1643 AD',
    coordinates: {
      lat: 27.1751,
      lng: 78.0421
    },
    timeline: [
      { year: "1631", event: "Construction began after the death of Mumtaz Mahal" },
      { year: "1643", event: "Construction of main mausoleum completed" },
      { year: "1648", event: "Entire complex completed" },
      { year: "1983", event: "Designated as a UNESCO World Heritage Site" }
    ],
    architecture: {
      style: "Mughal architecture with Persian, Islamic and Indian elements",
      features: [
        "Perfect symmetry",
        "White marble dome",
        "Intricate inlay work",
        "Four minarets",
        "Reflecting pool"
      ],
      materials: "White marble with inlaid precious and semi-precious stones"
    },
    howToReach: "The Taj Mahal is easily accessible from Delhi (200 km) via the Yamuna Expressway. Agra is well-connected by train from major cities. The nearest airport is Agra Airport, though Delhi International Airport offers better connectivity.",
    nearbyAttractions: [
      { name: "Agra Fort", distance: "2.5 km" },
      { name: "Fatehpur Sikri", distance: "40 km" },
      { name: "Mehtab Bagh", distance: "1 km" },
      { name: "Itimad-ud-Daulah", distance: "6 km" }
    ],
    visitorTips: [
      "Visit early morning to avoid crowds and for the best lighting",
      "Hire an official guide for a more informative experience",
      "No food or smoking is allowed inside",
      "Photography is allowed but tripods are restricted",
      "Wear comfortable shoes as you'll need to walk quite a bit"
    ]
  },
  {
    id: 'golden-temple',
    name: 'Golden Temple',
    category: 'monument',
    location: 'Amritsar, Punjab',
    region: 'North India',
    shortDescription: 'The holiest gurdwara and the most important pilgrimage site of Sikhism.',
    description: 'The Golden Temple, also known as Sri Harmandir Sahib, is a gurdwara located in the city of Amritsar, Punjab, India. It is the preeminent spiritual site of Sikhism. The temple is built around a man-made pool that was completed by the fourth Sikh Guru, Guru Ram Das, in 1577. The gurdwara was repeatedly rebuilt by the Sikhs after it became a target of persecution and was destroyed several times by the Mughal and invading Afghan armies.',
    imageUrl: 'https://images.unsplash.com/photo-1588083949403-3eda1bc38564',
    rating: 4.9,
    isFeatured: true,
    bestTimeToVisit: 'October to March',
    openingHours: 'Open 24 hours',
    visitDuration: '2-4 hours',
    entryFee: 'Free entry',
    established: '1604 AD',
    coordinates: {
      lat: 31.6200,
      lng: 74.8765
    }
  },
  {
    id: 'hawa-mahal',
    name: 'Hawa Mahal',
    category: 'monument',
    location: 'Jaipur, Rajasthan',
    region: 'West India',
    shortDescription: 'A palace in Jaipur, India, so named because it was essentially a high screen wall built so the women of the royal household could observe street festivals while unseen.',
    description: 'Hawa Mahal is a palace in Jaipur, India. Built from red and pink sandstone, the palace sits on the edge of the City Palace, Jaipur, and extends to the zenana, or women\'s chambers. The structure was built in 1799 by Maharaja Sawai Pratap Singh, the grandson of Maharaja Sawai Jai Singh, who was the founder of Jaipur.',
    imageUrl: 'https://images.unsplash.com/photo-1477587458883-47145ed94245',
    rating: 4.6,
    isFeatured: true,
    bestTimeToVisit: 'October to March',
    openingHours: '9:00 AM to 5:00 PM',
    visitDuration: '1-2 hours',
    entryFee: '₹50 for Indians, ₹200 for foreigners',
    established: '1799 AD',
    coordinates: {
      lat: 26.9239,
      lng: 75.8267
    }
  },
  {
    id: 'meenakshi-temple',
    name: 'Meenakshi Temple',
    category: 'monument',
    location: 'Madurai, Tamil Nadu',
    region: 'South India',
    shortDescription: 'A historic Hindu temple located on the southern bank of the Vaigai River in Madurai.',
    description: 'Arulmigu Meenakshi Amman Temple is a historic Hindu temple located on the southern bank of the Vaigai River in the temple city of Madurai, Tamil Nadu, India. It is dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwar, a form of Shiva. The temple is at the center of the ancient temple city of Madurai mentioned in the Tamil Sangam literature, with the goddess temple mentioned in 6th century CE texts.',
    imageUrl: 'https://images.unsplash.com/photo-1621351683756-3f30a45c6aca',
    rating: 4.8,
    isFeatured: false,
    bestTimeToVisit: 'October to March',
    openingHours: '5:00 AM to 12:30 PM, 4:00 PM to 10:00 PM',
    visitDuration: '2-3 hours',
    entryFee: 'Free entry for worshippers, ₹50 for camera usage',
    established: '6th century CE (rebuilt in 17th century)',
    coordinates: {
      lat: 9.9195,
      lng: 78.1193
    }
  },
  {
    id: 'konark-sun-temple',
    name: 'Konark Sun Temple',
    category: 'monument',
    location: 'Konark, Odisha',
    region: 'East India',
    shortDescription: 'A 13th-century Sun temple at Konark about 35 kilometres northeast from Puri on the coastline of Odisha, India.',
    description: 'The Konark Sun Temple is a 13th-century CE Sun temple at Konark about 35 kilometres northeast from Puri on the coastline of Odisha, India. Dedicated to the Hindu sun god Surya, what remains of the temple complex has the appearance of a 100-foot high chariot with immense wheels and horses, all carved from stone.',
    imageUrl: 'https://images.unsplash.com/photo-1627309649224-7b4494076479',
    rating: 4.7,
    isFeatured: false,
    bestTimeToVisit: 'October to March',
    openingHours: 'Sunrise to Sunset',
    visitDuration: '2-3 hours',
    entryFee: '₹40 for Indians, ₹600 for foreigners',
    established: '1250 AD',
    coordinates: {
      lat: 19.8876,
      lng: 86.0945
    }
  },
  {
    id: 'qutub-minar',
    name: 'Qutub Minar',
    category: 'monument',
    location: 'Delhi',
    region: 'North India',
    shortDescription: 'A minaret that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of Delhi, India.',
    description: 'The Qutub Minar, also spelled as Qutb Minar, is a minaret that forms part of the Qutb complex, a UNESCO World Heritage Site in the Mehrauli area of Delhi, India. Qutb Minar is a 73-metre tall tapering tower of five storeys, with a 14.3 metre base diameter, reducing to 2.7 metres at the top of the peak. It contains a spiral staircase of 379 steps.',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
    rating: 4.7,
    isFeatured: false,
    bestTimeToVisit: 'October to March',
    openingHours: 'Sunrise to Sunset',
    visitDuration: '1-2 hours',
    entryFee: '₹35 for Indians, ₹550 for foreigners',
    established: '1200 AD',
    coordinates: {
      lat: 28.5245,
      lng: 77.1855
    }
  },
  {
    id: 'holi-festival',
    name: 'Holi Festival',
    category: 'festival',
    location: 'Pan-India (most vibrant in North India)',
    region: 'Pan-India',
    shortDescription: 'The festival of colors, celebrating the arrival of spring and the triumph of good over evil.',
    description: 'Holi is a popular ancient Hindu festival, also known as the "Festival of Love", the "Festival of Colors", or the "Festival of Spring". The festival celebrates the eternal and divine love of Radha and Krishna. It also signifies the triumph of good over evil. It is predominantly celebrated in India, but has also spread to other areas of Asia and parts of the Western world through the diaspora.',
    imageUrl: 'https://images.unsplash.com/photo-1558023937-0a47f5fcf937',
    rating: 4.9,
    isFeatured: true,
    bestTimeToVisit: 'March (during full moon)',
    entryFee: 'Free for public celebrations, ticketed for organized events',
    coordinates: {
      lat: 27.1767,
      lng: 78.0081
    }
  },
  {
    id: 'kathakali',
    name: 'Kathakali',
    category: 'art',
    location: 'Kerala',
    region: 'South India',
    shortDescription: 'A major form of classical Indian dance known for its heavily stylized classical Indian dance-drama.',
    description: 'Kathakali is one of the major forms of classical Indian dance. It is a "story play" genre of art, but one distinguished by the elaborately colorful make-up, costumes and face masks that the traditionally male actor-dancers wear. Kathakali is performed primarily in Kerala, a state on the southwestern coast of India.',
    imageUrl: 'https://images.unsplash.com/photo-1583952936270-afb3e96c4f25',
    rating: 4.7,
    isFeatured: false,
    bestTimeToVisit: 'Year-round (special performances during festivals)',
    openingHours: 'Varies by venue',
    visitDuration: '2-3 hours',
    entryFee: '₹100-500 for performances',
    coordinates: {
      lat: 10.8505,
      lng: 76.2711
    }
  },
  {
    id: 'khajuraho-temples',
    name: 'Khajuraho Temples',
    category: 'heritage',
    location: 'Khajuraho, Madhya Pradesh',
    region: 'Central India',
    shortDescription: 'A group of Hindu and Jain temples known for their Nagara-style architectural symbolism and erotic sculptures.',
    description: 'The Khajuraho Group of Monuments are a group of Hindu temples and Jain temples in Chhatarpur district, Madhya Pradesh, India. The temples are famous for their nagara-style architectural symbolism and their erotic sculptures. Most Khajuraho temples were built between 950 and 1050 by the Chandela dynasty.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada',
    rating: 4.8,
    isFeatured: false,
    bestTimeToVisit: 'October to March',
    openingHours: 'Sunrise to Sunset',
    visitDuration: '3-4 hours',
    entryFee: '₹40 for Indians, ₹600 for foreigners',
    established: '950-1050 AD',
    coordinates: {
      lat: 24.8318,
      lng: 79.9195
    }
  },
  {
    id: 'mysore-palace',
    name: 'Mysore Palace',
    category: 'monument',
    location: 'Mysore, Karnataka',
    region: 'South India',
    shortDescription: 'The official residence and seat of the Wodeyars, the former royal family of Mysore, who ruled the princely state from 1399 to 1950.',
    description: 'The Mysore Palace, also known as Amba Vilas Palace, is a historical palace and a royal residence. It is located in Mysore, Karnataka. It is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore. The palace is in the centre of Mysore, and faces the Chamundi Hills eastward. Mysore is commonly described as the City of Palaces, and there are seven palaces including this one; however, Mysore Palace refers specifically to this one within the Old Fort.',
    imageUrl: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f',
    rating: 4.8,
    isFeatured: true,
    bestTimeToVisit: 'October to March',
    openingHours: '10:00 AM to 5:30 PM (Illuminated on Sundays 7:00 PM to 8:00 PM)',
    visitDuration: '2-3 hours',
    entryFee: '₹50 for Indians, ₹200 for foreigners',
    established: '1912 AD (current structure)',
    coordinates: {
      lat: 12.3052,
      lng: 76.6552
    }
  },
  {
    id: 'diwali-festival',
    name: 'Diwali Festival',
    category: 'festival',
    location: 'Pan-India',
    region: 'Pan-India',
    shortDescription: 'The festival of lights, one of the major festivals celebrated by Hindus, Jains, and Sikhs.',
    description: "Diwali, or Deepavali, is a major religious festival in Hinduism, Jainism, and Sikhism. The word \"Deepavali\" means \"rows of lighted lamps\". It is celebrated during the Hindu lunisolar month Kartika (between mid-October and mid-November). One of the most popular festivals of Hinduism, Diwali symbolises the spiritual \"victory of light over darkness, good over evil, and knowledge over ignorance\".",
    imageUrl: 'https://images.unsplash.com/photo-1573173916903-de3dcd3e92a4',
    rating: 4.9,
    isFeatured: true,
    bestTimeToVisit: 'October-November (varies by lunar calendar)',
    entryFee: 'Free for public celebrations',
    coordinates: {
      lat: 28.6139,
      lng: 77.2090
    }
  }
];

// Cultural Insights
export const culturalInsights: CulturalInsight[] = [
  {
    id: uuid(),
    title: 'The Mathematical Marvel of Taj Mahal',
    content: 'The Taj Mahal\'s construction involved complex mathematics. The dome\'s height is precisely equal to the length of the base, and the minarets are designed to tilt slightly outward to prevent them from falling on the main structure during an earthquake.',
    category: 'architecture'
  },
  {
    id: uuid(),
    title: 'Origin of Rangoli Art',
    content: 'Rangoli, the colorful floor art, dates back to the Puranas where it\'s mentioned that a king had lost his son. Lord Brahma painted a portrait of the boy which brought him back to life, originating the tradition of decorative art for good fortune.',
    category: 'art'
  },
  {
    id: uuid(),
    title: 'The Surprising Age of Indian Classical Music',
    content: 'The origins of Indian classical music, including ragas and talas, can be traced back over 6,000 years to the Vedic period, making it one of the oldest musical traditions still practiced today.',
    category: 'music'
  },
  {
    id: uuid(),
    title: 'The Ancient University of Nalanda',
    content: 'Nalanda University, established in the 5th century CE, was one of the world\'s first residential universities and accommodated over 10,000 students and 2,000 teachers. It had eight separate compounds and ten temples with curriculum covering logic, grammar, medicine, and more.',
    category: 'education'
  },
  {
    id: uuid(),
    title: 'The Living Root Bridges of Meghalaya',
    content: 'In Meghalaya, the Khasi and Jaintia tribes create "living root bridges" by guiding the roots of rubber trees across rivers. These bridges strengthen over time, with some being over 500 years old and capable of supporting the weight of 50 people at once.',
    category: 'architecture'
  },
  {
    id: uuid(),
    title: 'Kerala\'s Snake Boat Races',
    content: 'The Vallamkali (snake boat races) of Kerala feature boats that are up to 120 feet long and can accommodate up to 100 rowers. These races originate from ancient times when kings would send troops to war in these boats.',
    category: 'tradition'
  },
  {
    id: uuid(),
    title: 'The Mathematics of Temple Architecture',
    content: 'Hindu temples follow precise mathematical principles with the "Vaastu Purusha Mandala" as their basis. This grid system represents cosmic energy and is divided into squares, with each square governing a specific aspect of architectural design.',
    category: 'architecture'
  },
  {
    id: uuid(),
    title: 'The Ancient Plastic Surgery',
    content: 'Sushruta, an ancient Indian physician who lived around 600 BCE, is considered the "Father of Plastic Surgery." His text, Sushruta Samhita, describes over 300 surgical procedures and 120 surgical instruments, including techniques for reconstructing noses, earlobes, and other body parts.',
    category: 'science'
  },
  {
    id: uuid(),
    title: 'The Astronomical Design of Jantar Mantar',
    content: 'The Jantar Mantar observatory in Jaipur, built in the early 18th century, contains 19 astronomical instruments capable of predicting eclipses and tracking celestial bodies with the naked eye. Its sundial, the Samrat Yantra, can tell time with an accuracy of two seconds.',
    category: 'science'
  },
  {
    id: uuid(),
    title: 'The Significance of Mehendi (Henna)',
    content: 'Beyond aesthetics, the application of mehendi (henna) has medicinal properties. It cools the body, prevents stress, and strengthens the nails. Traditionally, the darker the color on a bride\'s hands, the stronger her future relationship with her mother-in-law is believed to be.',
    category: 'tradition'
  }
];
