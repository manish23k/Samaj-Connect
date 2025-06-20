// src/app/(app)/donations/page.tsx
"use client";

import { DonationEntry } from '@/components/donations/DonationEntry';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Donation } from '@/types/donations';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const mockDonations: Donation[] = [
  {
    id: '1',
    donorName: 'Rajesh Patel',
    amount: 5000,
    currency: '₹',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    purpose: 'Community Hall Renovation',
  },
  {
    id: '2',
    donorName: 'Priya Sharma',
    amount: 2500,
    currency: '₹',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    purpose: 'Educational Fund for Children',
  },
  {
    id: '3',
    amount: 10000,
    currency: '₹',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), // 15 days ago
    purpose: 'Annual Cultural Festival',
  },
];

export default function DonationsPage() {
  const { t } = useLanguage();
  const [donations, setDonations] = useState<Donation[]>(mockDonations);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock form state for new donation
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleMakeDonation = () => {
    // In a real app, this would submit to a backend/payment gateway
    if (!amount) return;
    const newDonation: Donation = {
      id: String(Date.now()),
      donorName: donorName || undefined,
      amount: parseFloat(amount),
      currency: '₹',
      date: new Date().toISOString(),
      purpose: purpose || undefined,
    };
    setDonations([newDonation, ...donations]);
    setIsModalOpen(false);
    // Reset form
    setDonorName('');
    setAmount('');
    setPurpose('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-headline font-bold text-primary">{t('donations')}</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="shadow-md hover:shadow-lg transition-shadow">
              <PlusCircle className="mr-2 h-5 w-5" /> {t('makeDonation')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline text-primary">{t('makeDonation')}</DialogTitle>
              <DialogDescription>
                {t('supportCommunity')}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="donorNameModal" className="text-right">
                  {t('name')}
                </Label>
                <Input id="donorNameModal" value={donorName} onChange={(e) => setDonorName(e.target.value)} className="col-span-3" placeholder={t('anonymous')} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amountModal" className="text-right">
                  {t('amount')} (₹)
                </Label>
                <Input id="amountModal" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="col-span-3" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="purposeModal" className="text-right">
                  {t('purpose')}
                </Label>
                <Input id="purposeModal" value={purpose} onChange={(e) => setPurpose(e.target.value)} className="col-span-3" placeholder="e.g., General Fund" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleMakeDonation} disabled={!amount}>{t('makeDonation')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {donations.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">{t('noDonations')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donations.map((donation) => (
            <DonationEntry key={donation.id} donation={donation} />
          ))}
        </div>
      )}
    </div>
  );
}
