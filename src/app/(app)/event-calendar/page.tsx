// src/app/(app)/event-calendar/page.tsx
"use client";

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { EventItem } from '@/components/event-calendar/EventItem';
import { useLanguage } from '@/contexts/LanguageContext';
import type { CommunityEvent } from '@/types/event-calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Annual Community Picnic',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).toISOString(),
    time: '12:00 PM - 4:00 PM',
    location: 'Central Park, Green Meadows',
    description: 'Join us for a day of fun, food, and community bonding. Bring your family and friends!',
  },
  {
    id: '2',
    title: 'Cultural Evening: Music & Dance',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 14).toISOString(),
    time: '6:00 PM - 9:00 PM',
    location: 'Community Hall, Main Street',
    description: 'Experience an evening of vibrant cultural performances. Traditional music, dance, and art displays.',
  },
  {
    id: '3',
    title: 'Charity Drive Kick-off',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 21).toISOString(),
    time: '10:00 AM',
    location: 'Town Square',
    description: 'Help us kick off our annual charity drive. Donations welcome for local shelters.',
  },
   {
    id: '4',
    title: 'Tech Workshop for Seniors',
    date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString(),
    time: '2:00 PM - 4:00 PM',
    location: 'Library Auditorium',
    description: 'A beginner-friendly workshop to help seniors get comfortable with smartphones and internet basics.',
  },
];

export default function EventCalendarPage() {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CommunityEvent[]>(mockEvents);

  const selectedDayEvents = events.filter(event => 
    new Date(event.date).toDateString() === (date ? date.toDateString() : new Date().toDateString())
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-headline font-bold text-primary">{t('eventCalendar')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-lg rounded-xl">
          <CardContent className="p-2 sm:p-4 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              modifiers={{ highlighted: events.map(e => new Date(e.date)) }}
              modifiersStyles={{ highlighted: { border: "2px solid hsl(var(--accent))", borderRadius: "var(--radius)"} }}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-headline text-primary">
              {date ? t('upcomingEvents') + ` on ${date.toLocaleDateString()}` : t('upcomingEvents')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] sm:h-[500px] pr-3">
              {selectedDayEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDayEvents.map((event) => (
                    <EventItem key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">{t('noEvents')} for selected date.</p>
              )}
               {selectedDayEvents.length === 0 && events.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-3 text-primary/80">All Upcoming Events</h3>
                     <div className="space-y-4">
                        {events.filter(e => new Date(e.date) >= new Date()).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((event) => (
                          <EventItem key={event.id} event={event} />
                        ))}
                      </div>
                  </div>
               )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
