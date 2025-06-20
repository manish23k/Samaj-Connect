// src/components/event-calendar/EventItem.tsx
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon, MapPinIcon, InfoIcon } from 'lucide-react';
import { type CommunityEvent } from '@/types/event-calendar';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { enUS, gu } from 'date-fns/locale';

export function EventItem({ event }: { event: CommunityEvent }) {
  const { t, language } = useLanguage();
  const dateLocale = language === 'gu' ? gu : enUS;

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
      <CardHeader className="p-4 bg-primary/5">
        <CardTitle className="text-lg font-semibold font-headline text-primary">{event.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground flex items-center">
          <CalendarIcon className="mr-1.5 h-3.5 w-3.5" />
          {format(new Date(event.date), 'PPP', { locale: dateLocale })}
          <ClockIcon className="ml-3 mr-1.5 h-3.5 w-3.5" />
          {event.time}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        {event.description && (
          <div className="flex items-start text-sm text-foreground">
            <InfoIcon className="mr-2 h-4 w-4 mt-0.5 shrink-0 text-primary" />
            <p className="leading-relaxed">{event.description}</p>
          </div>
        )}
        {event.location && (
          <div className="flex items-center text-sm text-foreground">
            <MapPinIcon className="mr-2 h-4 w-4 shrink-0 text-primary" />
            <p>{event.location}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button variant="outline" size="sm" className="w-full hover:bg-accent hover:text-accent-foreground">
          {t('rsvp')}
        </Button>
      </CardFooter>
    </Card>
  );
}
