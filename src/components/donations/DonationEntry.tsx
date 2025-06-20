// src/components/donations/DonationEntry.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type Donation } from '@/types/donations';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { enUS, gu } from 'date-fns/locale';
import { Gift, User, CalendarDays, Tag } from 'lucide-react';

export function DonationEntry({ donation }: { donation: Donation }) {
  const { t, language } = useLanguage();
  const dateLocale = language === 'gu' ? gu : enUS;

  return (
    <Card className="w-full shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden">
      <CardHeader className="p-4 bg-primary/5 flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Gift className="h-6 w-6 mr-3 text-primary" />
          <div>
            <CardTitle className="text-md font-semibold font-body">
              {t('amount')}: {donation.currency}{donation.amount.toLocaleString(language === 'gu' ? 'gu-IN' : 'en-US')}
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {t('date')}: {format(new Date(donation.date), 'PP', { locale: dateLocale })}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-1.5 text-sm">
        <div className="flex items-center text-foreground">
          <User className="h-4 w-4 mr-2 text-primary/80" /> 
          <span>{t('postedBy', { name: donation.donorName || t('anonymous') })}</span>
        </div>
        {donation.purpose && (
          <div className="flex items-center text-foreground">
            <Tag className="h-4 w-4 mr-2 text-primary/80" />
            <span>{t('purpose')}: {donation.purpose}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
