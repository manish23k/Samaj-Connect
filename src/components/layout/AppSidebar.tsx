// src/components/layout/AppSidebar.tsx
"use client";

import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Newspaper, CalendarDays, Users, Gift, Home, UserCircle2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../ui/button';

const navItems = [
  { href: '/news-feed', labelKey: 'newsFeed', icon: Newspaper },
  { href: '/event-calendar', labelKey: 'eventCalendar', icon: CalendarDays },
  { href: '/group-chat', labelKey: 'groupChat', icon: Users },
  { href: '/donations', labelKey: 'donations', icon: Gift },
];

export function AppSidebar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader className="p-4 justify-between items-center hidden lg:flex">
        {/* Placeholder for logo or app name, or can be kept minimal */}
        <Link href="/" className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-sidebar-primary group-data-[state=collapsed]:hidden">
                <path d="M12 2C6.48 2 2 6.48 2 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2v-2zm0 4h2v6h-2v-6z"/>
             </svg>
             <span className="font-headline text-xl font-bold text-sidebar-primary group-data-[state=collapsed]:hidden">{t('appName')}</span>
        </Link>
        <SidebarTrigger className="text-sidebar-foreground hidden lg:flex group-data-[state=collapsed]:hidden" />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.labelKey}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={{ children: t(item.labelKey as any), side: 'right', align: 'center' }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{t(item.labelKey as any)}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 mt-auto border-t border-sidebar-border">
        {user && (
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/profile'}
                  tooltip={{ children: t('profile'), side: 'right', align: 'center' }}
                >
                  <Link href="/profile">
                    <UserCircle2 />
                    <span>{t('profile')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton
                  onClick={logout}
                  tooltip={{ children: t('logout'), side: 'right', align: 'center' }}
                  className="w-full"
                 >
                    <LogOut />
                    <span>{t('logout')}</span>
                 </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
