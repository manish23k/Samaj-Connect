// src/types/event-calendar.ts
export interface CommunityEvent {
  id: string;
  title: string;
  date: string; // ISO date string
  time: string;
  location?: string;
  description?: string;
}
