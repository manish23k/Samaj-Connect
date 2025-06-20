// src/app/signup/page.tsx
import { SignupForm } from '@/components/auth/SignupForm';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 relative">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
       <Link href="/" className="absolute top-4 left-4 flex items-center space-x-2 text-primary hover:text-accent transition-colors">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
           <path d="M12 2C6.48 2 2 6.48 2 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2v-2zm0 4h2v6h-2v-6z"/>
         </svg>
        <span className="font-headline text-xl font-bold">Samaj Connect</span>
      </Link>
      <SignupForm />
    </div>
  );
}
