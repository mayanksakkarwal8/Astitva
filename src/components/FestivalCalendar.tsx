import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { DayProps } from 'react-day-picker';
import TithiCalendar from './TithiCalendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample festival data - in a real app this would come from an API/database
const festivalData = [
  {
    id: 1,
    name: 'Diwali',
    date: new Date(2024, 10, 1), // November 1, 2024
    region: 'Pan-India',
    description: 'Festival of lights celebrating the victory of light over darkness.'
  },
  {
    id: 2,
    name: 'Holi',
    date: new Date(2025, 2, 14), // March 14, 2025
    region: 'North India',
    description: 'Festival of colors celebrating the arrival of spring.'
  },
  {
    id: 3,
    name: 'Pongal',
    date: new Date(2025, 0, 15), // January 15, 2025
    region: 'South India',
    description: 'Harvest festival dedicated to the Sun God.'
  },
  {
    id: 4,
    name: 'Durga Puja',
    date: new Date(2024, 9, 12), // October 12, 2024
    region: 'East India',
    description: 'Worship of goddess Durga celebrating her victory over evil.'
  },
  {
    id: 5,
    name: 'Ganesh Chaturthi',
    date: new Date(2024, 8, 7), // September 7, 2024
    region: 'West India',
    description: 'Birthday of Lord Ganesha, the remover of obstacles.'
  }
];

const FestivalCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedFestival, setSelectedFestival] = useState<any | null>(null);
  const { t } = useLanguage();

  // Find festivals occurring on the selected date
  const festivalsOnDate = date 
    ? festivalData.filter(
        festival => 
          festival.date.getDate() === date.getDate() && 
          festival.date.getMonth() === date.getMonth()
      )
    : [];

  // Function to highlight dates that have festivals
  const isFestivalDate = (date: Date) => {
    return festivalData.some(
      festival => 
        festival.date.getDate() === date.getDate() && 
        festival.date.getMonth() === date.getMonth()
    );
  };
  
  // Custom festival date renderer with correct DayProps type
  const renderDay = (props: DayProps) => {
    const { date: day } = props;
    const hasFestival = day ? isFestivalDate(day) : false;
    
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${hasFestival ? 'font-bold' : ''}`}>
        {day ? day.getDate() : ''}
        {hasFestival && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-terracotta"></div>
        )}
      </div>
    );
  };

  return (
    <Tabs defaultValue="festivals" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="festivals" className="flex items-center gap-2">
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
            alt="Festivals" 
            className="w-6 h-6 rounded-full object-cover"
          />
          Cultural Festivals
        </TabsTrigger>
        <TabsTrigger value="tithi" className="flex items-center gap-2">
          <img 
            src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae" 
            alt="Tithi" 
            className="w-6 h-6 rounded-full object-cover"
          />
          हिन्दू पंचांग
        </TabsTrigger>
      </TabsList>

      <TabsContent value="festivals">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 bg-white shadow-md border-0">
            <CardHeader>
              <CardTitle>Festival Calendar</CardTitle>
              <CardDescription>Browse festivals across India</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-3 pointer-events-auto rounded-lg"
                components={{ Day: renderDay }}
              />
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2 bg-white shadow-md border-0">
            <CardHeader>
              <CardTitle>
                {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
              </CardTitle>
              <CardDescription>
                {festivalsOnDate.length > 0 
                  ? `${festivalsOnDate.length} festival${festivalsOnDate.length > 1 ? 's' : ''} on this date` 
                  : 'No festivals on this date'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {festivalsOnDate.length > 0 ? (
                <div className="space-y-4">
                  {festivalsOnDate.map(festival => (
                    <div 
                      key={festival.id} 
                      className="p-4 border border-muted rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedFestival(festival)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-primary">{festival.name}</h3>
                        <Badge variant="outline">{festival.region}</Badge>
                      </div>
                      <p className="text-sm">{festival.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <p>No festivals scheduled for this date.</p>
                  <p className="mt-2 text-sm">Select a different date or add a new festival.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="tithi">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TithiCalendar />
          <Card className="bg-white shadow-md border-0">
            <CardHeader>
              <CardTitle>पंचांग महत्व</CardTitle>
              <CardDescription>Significance of Tithi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  हिन्दू पंचांग में तिथि का विशेष महत्व है। यह चंद्रमा की कलाओं पर आधारित है और विभिन्न धार्मिक अनुष्ठानों के लिए शुभ समय का निर्धारण करती है।
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-2">शुक्ल पक्ष</h4>
                    <p className="text-sm text-muted-foreground">चंद्रमा की वृद्धि का काल</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-2">कृष्ण पक्ष</h4>
                    <p className="text-sm text-muted-foreground">चंद्रमा की क्षय का काल</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FestivalCalendar;
