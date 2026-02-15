import type { Metadata, Viewport } from 'next';
import './globals.css';
import ClientShell from './ClientShell';

export const metadata: Metadata = {
  title: 'SchnauzTrain — Éducation canine',
  description: 'App d\'éducation et de gestion de la réactivité pour schnauzers',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SchnauzTrain',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3b82f6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.svg" />
      </head>
      <body className="antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
