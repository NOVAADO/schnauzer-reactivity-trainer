'use client';

import { usePathname } from 'next/navigation';
import BottomNav from '@/components/ui/BottomNav';
import ServiceWorkerRegistration from '@/components/ui/ServiceWorkerRegistration';
import { useHasOnboarded } from '@/lib/hooks';

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const hasOnboarded = useHasOnboarded();
  const pathname = usePathname();
  const isOnboarding = pathname === '/onboarding';

  // Show loading while checking DB
  if (hasOnboarded === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🐾</div>
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ServiceWorkerRegistration />
      <main className={`max-w-lg mx-auto px-4 pt-4 ${hasOnboarded && !isOnboarding ? 'pb-20' : ''}`}>{children}</main>
      {hasOnboarded && !isOnboarding && <BottomNav />}
    </>
  );
}
