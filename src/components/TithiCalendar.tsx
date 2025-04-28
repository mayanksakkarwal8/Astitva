
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

// Sample tithi data - in a real app this would come from an API
const tithiData = [
  {
    id: 1,
    name: 'प्रतिपदा (Pratipada)',
    date: new Date(2024, 3, 28),
    paksha: 'शुक्ल पक्ष',
    significance: 'शुभ कार्यों के लिए उत्तम'
  },
  {
    id: 2,
    name: 'द्वितीया (Dwitiya)',
    date: new Date(2024, 3, 29),
    paksha: 'शुक्ल पक्ष',
    significance: 'चंद्र बल प्रबल'
  },
  {
    id: 3,
    name: 'त्रयोदशी (Trayodashi)',
    date: new Date(2024, 4, 10),
    paksha: 'कृष्ण पक्ष',
    significance: 'प्रदोष व्रत'
  }
];

const TithiCalendar: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const tithisOnDate = date 
    ? tithiData.filter(
        tithi => 
          tithi.date.getDate() === date.getDate() && 
          tithi.date.getMonth() === date.getMonth()
      )
    : [];

  const isTithiDate = (date: Date) => {
    return tithiData.some(
      tithi => 
        tithi.date.getDate() === date.getDate() && 
        tithi.date.getMonth() === date.getMonth()
    );
  };

  return (
    <Card className="bg-white shadow-md border-0">
      <CardHeader>
        <CardTitle>हिन्दू तिथि पंचांग</CardTitle>
        <CardDescription>Hindu Tithi Calendar</CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className={cn("p-3 pointer-events-auto rounded-lg")}
        />
        
        <div className="mt-4">
          {tithisOnDate.length > 0 ? (
            <div className="space-y-3">
              {tithisOnDate.map(tithi => (
                <div 
                  key={tithi.id} 
                  className="p-3 border border-muted rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">{tithi.name}</h4>
                    <Badge variant="outline">{tithi.paksha}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{tithi.significance}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No tithi information available for this date
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TithiCalendar;
