// src/app/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Newspaper, CalendarDays, Users, Gift, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const { t } = useLanguage();

  const features = [
    { name: t('newsFeed'), icon: Newspaper, description: "Stay updated with the latest community news and announcements.", href: "/news-feed" },
    { name: t('eventCalendar'), icon: CalendarDays, description: "Never miss important community events and gatherings.", href: "/event-calendar" },
    { name: t('groupChat'), icon: Users, description: "Connect and discuss with fellow community members in various groups.", href: "/group-chat" },
    { name: t('donations'), icon: Gift, description: "Contribute to community causes and track donations easily.", href: "/donations" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2v-2zm0 4h2v6h-2v-6z"/>
            </svg>
            <span className="font-headline text-xl font-bold text-primary">{t('appName')}</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">{t('login')}</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">{t('signup')}</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
          <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div>
          <div className="container relative text-center">
            <h1 className="text-4xl font-headline font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
              {t('welcomeTo')} <span className="text-accent">{t('appName')}</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
              {t('tagline')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/signup">
                  {t('getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="shadow-sm hover:shadow-md transition-shadow">
                <Link href="/login">{t('exploreFeatures')}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-background">
          <div className="container">
            <h2 className="text-3xl font-headline font-bold text-center text-primary mb-12">
              {t('exploreFeatures')}
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
                  <div className="bg-accent/20 p-4 rounded-full mb-4">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-headline font-semibold text-primary mb-2">{feature.name}</h3>
                  <p className="text-sm text-muted-foreground flex-grow">{feature.description}</p>
                  <Button variant="link" asChild className="mt-4 text-accent">
                    <Link href={feature.href}>Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-primary/5">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <Image src="https://placehold.co/600x400.png" alt="Community Members" data-ai-hint="community people" width={600} height={400} className="rounded-xl shadow-2xl" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-headline">{t('joinDiscussion')}</h2>
                        <p className="mt-6 text-lg leading-8 text-foreground/80">
                            {t('appName')} {t('tagline')}
                        </p>
                        <p className="mt-4 text-lg leading-8 text-foreground/80">
                           {t('supportCommunity')}
                        </p>
                        <div className="mt-10">
                            <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
                                <Link href="/signup">
                                    {t('getStarted')} <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <footer className="py-8 bg-card border-t">
        <div className="container text-center text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} {t('appName')}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
