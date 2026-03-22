'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { href: '/', label: 'Accueil', icon: '🏠', highlight: false },
  { href: '/education', label: 'Apprendre', icon: '🎓', highlight: false },
  { href: '/intervention', label: 'SOS', icon: '🚨', highlight: true },
  { href: '/reactivity', label: 'Réactivité', icon: '⚡', highlight: false },
  { href: '/progression', label: 'Progrès', icon: '📊', highlight: false },
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
                tab.highlight
                  ? 'text-red-600 font-bold'
                  : isActive ? 'text-blue-600 font-semibold' : 'text-gray-500'
              }`}
            >
              <span className={tab.highlight ? 'text-2xl -mt-1' : 'text-xl'}>{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
