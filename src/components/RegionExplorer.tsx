
import React, { useState } from 'react';
import { regions } from '@/data/culturalData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Improved image URLs for regions with direct image links instead of random Unsplash
const regionStates = {
  north: [
    { id: 'delhi', name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&auto=format&fit=crop&q=80', description: 'The capital territory, known for Red Fort, Qutub Minar, and India Gate.' },
    { id: 'himachal', name: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop&q=80', description: 'Known for its scenic mountain views, temples, and hill stations like Shimla and Manali.' },
    { id: 'punjab', name: 'Punjab', image: 'https://images.unsplash.com/photo-1588083949403-3eda1bc38564?w=600&auto=format&fit=crop&q=80', description: 'Famous for the Golden Temple, rich agricultural lands, and vibrant Bhangra dance.' },
    { id: 'uttarakhand', name: 'Uttarakhand', image: 'https://images.unsplash.com/photo-1506461883276-594a9d6add46?w=600&auto=format&fit=crop&q=80', description: 'Known as the "Land of Gods", famous for Himalayan peaks, sacred rivers, and yoga.' }
  ],
  south: [
    { id: 'kerala', name: 'Kerala', image: 'https://images.unsplash.com/photo-1602153508975-f9fe9399243b?w=600&auto=format&fit=crop&q=80', description: 'Known as "God\'s Own Country", famous for backwaters, beaches, and Kathakali dance.' },
    { id: 'tamilnadu', name: 'Tamil Nadu', image: 'https://images.unsplash.com/photo-1621351683756-3f30a45c6aca?w=600&auto=format&fit=crop&q=80', description: 'Famous for ancient Dravidian temples, classical Bharatanatyam dance, and cuisine.' },
    { id: 'karnataka', name: 'Karnataka', image: 'https://images.unsplash.com/photo-1570458436416-b8fcccfe883f?w=600&auto=format&fit=crop&q=80', description: 'Known for tech hub Bangalore, historic Mysore Palace, and Hampi ruins.' },
    { id: 'andhra', name: 'Andhra Pradesh', image: 'https://images.unsplash.com/photo-1583395825805-b67cdf700f70?w=600&auto=format&fit=crop&q=80', description: 'Famous for Tirupati temple, coastal beauty, and spicy cuisine.' }
  ],
  east: [
    { id: 'bengal', name: 'West Bengal', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=600&auto=format&fit=crop&q=80', description: 'Known for Kolkata\'s colonial architecture, Durga Puja, and Rabindranath Tagore\'s legacy.' },
    { id: 'odisha', name: 'Odisha', image: 'https://images.unsplash.com/photo-1623776025811-fd139155a39b?w=600&auto=format&fit=crop&q=80', description: 'Famous for Sun Temple, Jagannath Temple, and ancient tribal cultures.' },
    { id: 'assam', name: 'Assam', image: 'https://images.unsplash.com/photo-1590766116485-d2122b7cca95?w=600&auto=format&fit=crop&q=80', description: 'Known for tea plantations, Kaziranga National Park, and Bihu dance.' },
    { id: 'sikkim', name: 'Sikkim', image: 'https://images.unsplash.com/photo-1609909468378-cb2219fc1e55?w=600&auto=format&fit=crop&q=80', description: 'A mountainous state with Buddhist monasteries and stunning Himalayan views.' }
  ],
  west: [
    { id: 'gujarat', name: 'Gujarat', image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&auto=format&fit=crop&q=80', description: 'Known for vibrant textiles, the Great Rann of Kutch, and Navratri festival.' },
    { id: 'maharashtra', name: 'Maharashtra', image: 'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=600&auto=format&fit=crop&q=80', description: 'Home to Mumbai, Ajanta-Ellora caves, and rich Marathi culture.' },
    { id: 'rajasthan', name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&auto=format&fit=crop&q=80', description: 'The "Land of Kings" known for palaces, forts, and vibrant desert culture.' },
    { id: 'goa', name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80', description: 'Famous for beaches, Portuguese architecture, and unique Indo-Portuguese culture.' }
  ],
  central: [
    { id: 'mp', name: 'Madhya Pradesh', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&auto=format&fit=crop&q=80', description: 'Known as the "Heart of India", famous for Khajuraho temples and wildlife.' },
    { id: 'chhattisgarh', name: 'Chhattisgarh', image: 'https://images.unsplash.com/photo-1605019129362-c23649134018?w=600&auto=format&fit=crop&q=80', description: 'Rich in tribal heritage, forests, and waterfalls.' },
    { id: 'jharkhand', name: 'Jharkhand', image: 'https://images.unsplash.com/photo-1627301517152-11505d049886?w=600&auto=format&fit=crop&q=80', description: 'Known for mineral resources, tribal culture, and natural beauty.' },
    { id: 'up', name: 'Uttar Pradesh', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80', description: 'Home to the Taj Mahal, Varanasi, and significant spiritual heritage.' }
  ],
  northeast: [
    { id: 'arunachal', name: 'Arunachal Pradesh', image: 'https://images.unsplash.com/photo-1593037155567-553fa0a9f411?w=600&auto=format&fit=crop&q=80', description: 'Known as the "Land of Dawn-Lit Mountains" with diverse tribal cultures.' },
    { id: 'manipur', name: 'Manipur', image: 'https://images.unsplash.com/photo-1553308143-3eca6c565917?w=600&auto=format&fit=crop&q=80', description: 'Famous for Loktak Lake, classical Manipuri dance, and indigenous sports.' },
    { id: 'meghalaya', name: 'Meghalaya', image: 'https://images.unsplash.com/photo-1602152915060-550a0c9362b7?w=600&auto=format&fit=crop&q=80', description: 'Known as "Abode of Clouds", famous for living root bridges and waterfalls.' },
    { id: 'nagaland', name: 'Nagaland', image: 'https://images.unsplash.com/photo-1590766234184-87e25a3e3e59?w=600&auto=format&fit=crop&q=80', description: 'Known for Hornbill Festival, tribal heritage, and stunning hill landscapes.' }
  ]
};

const RegionExplorer: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("north");
  
  const getRegionById = (id: string) => {
    return regions.find(region => region.id === id);
  };

  const currentRegion = getRegionById(selectedRegion);
  const states = regionStates[selectedRegion as keyof typeof regionStates] || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <Tabs defaultValue="north" onValueChange={setSelectedRegion}>
        <div className="p-4 bg-gray-50 dark:bg-gray-900/50">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-7 gap-2">
            {regions.map((region) => (
              <TabsTrigger 
                key={region.id}
                value={region.id}
                className="flex flex-col items-center gap-2 px-3 py-2"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${
                      region.id === 'north' ? '1482938289607-e9573fc25ebb' :
                      region.id === 'south' ? '1466442929976-97f336a657be' :
                      region.id === 'east' ? '1433086966358-54859d0ed716' :
                      region.id === 'west' ? '1426604966848-d7adac402bff' :
                      region.id === 'central' ? '1482938289607-e9573fc25ebb' :
                      region.id === 'northeast' ? '1433086966358-54859d0ed716' :
                      '1482938289607-e9573fc25ebb'
                    }`}
                    alt={region.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://placehold.co/200x200/terracotta/white?text=" + encodeURIComponent(region.name);
                    }}
                  />
                </div>
                <span className="text-sm font-medium">{region.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {regions.map((region) => (
          <TabsContent key={region.id} value={region.id} className="p-0">
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-semibold text-deepBlue dark:text-gold mb-2">
                  {region.name} India
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentRegion?.description || `Explore the diverse cultural heritage, traditions, and landmarks of ${region.name}ern India.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {states.map((state) => (
                  <div key={state.id} className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800/50 shadow-sm hover-lift transition-all">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={state.image} 
                        alt={state.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://placehold.co/600x400/terracotta/white?text=" + encodeURIComponent(state.name);
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-serif font-semibold text-gray-900 dark:text-white mb-2">
                        {state.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {state.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RegionExplorer;
