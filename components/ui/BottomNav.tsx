'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Accueil', icon: '🏠' },
  { href: '/education', label: 'Apprendre', icon: '🎓' },
  { href: '/reactivity', label: 'Réactivité', icon: '⚡' },
  { href: '/care', label: 'Soins', icon: '🩺' },
  { href: '/progression', label: 'Progrès', icon: '📊' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/'
              ? pathname === '/'
              : tab.href === '/education'
              ? pathname.startsWith('/education') || pathname.startsWith('/enrichment')
              : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-0.5 text-xs transition-colors ${
                isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
