// src/app/(app)/profile/page.tsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut, Edit3, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { User } from '@/types/user';

export default function ProfilePage() {
  const { user, logout, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  // Add more fields as needed, e.g., address, contact for Profile Management

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSaveChanges = () => {
    // In a real app, this would update user data via an API call
    console.log("Saving changes:", { name, email });
    // Example: Update user in AuthContext (if supported) or refetch
    setIsEditing(false);
    // Potentially show a success toast
  };

  if (authLoading) {
    return <div className="flex justify-center items-center h-full"><p>Loading profile...</p></div>;
  }

  if (!user) {
    // This case should ideally be handled by the (app) layout redirecting to login
    return <div className="flex justify-center items-center h-full"><p>User not found. Please log in.</p></div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-headline font-bold text-primary">{t('myProfile')}</h1>

      <Card className="shadow-xl">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
            <AvatarImage src={user.avatarUrl || `https://placehold.co/100x100.png?text=${user.name.charAt(0).toUpperCase()}`} alt={user.name} data-ai-hint="profile avatar" />
            <AvatarFallback className="text-3xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          {!isEditing && (
            <>
              <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="profileName">{t('name')}</Label>
                <Input id="profileName" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profileEmail">{t('email')}</Label>
                <Input id="profileEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              {/* Add more editable fields here: Address, Contact, Photo upload etc. */}
            </>
          ) : (
            <>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">{t('name')}</Label>
                <p className="text-md">{user.name}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">{t('email')}</Label>
                <p className="text-md">{user.email}</p>
              </div>
              {/* Display other profile fields here */}
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 border-t pt-6">
          {isEditing ? (
            <Button onClick={handleSaveChanges} className="w-full sm:w-auto">
              <Save className="mr-2 h-4 w-4" /> {t('saveChanges')}
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="w-full sm:w-auto">
              <Edit3 className="mr-2 h-4 w-4" /> {t('editProfile')}
            </Button>
          )}
          <Button variant="destructive" onClick={logout} className="w-full sm:w-auto">
            <LogOut className="mr-2 h-4 w-4" /> {t('logout')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
