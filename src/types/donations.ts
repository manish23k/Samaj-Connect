// src/types/donations.ts
export interface Donation {
  id: string;
  donorName?: string; // Optional, could be anonymous
  amount: number;
  currency: string; // e.g., "USD", "INR"
  date: string; // ISO date string
  purpose?: string;
  transactionId?: string; // For tracking
}
