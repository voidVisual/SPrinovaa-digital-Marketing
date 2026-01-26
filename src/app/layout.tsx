import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { CursorGlow } from '@/components/cursor-glow';

export const metadata: Metadata = {
  title: 'SPrinova-Digital Marketing | Your strategic partner for digital transformation',
  description: 'We boost your business through technology and digital marketing.',
  icons: {
    icon: '/images/SPrinovaa.png',
    apple: '/images/SPrinovaa.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/png" href="/images/SPrinovaa.png" />
        <link rel="shortcut icon" type="image/png" href="/images/SPrinovaa.png" />
        <link rel="apple-touch-icon" href="/images/SPrinovaa.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet" />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0SDLC0GCLB"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0SDLC0GCLB');
          `}
        </Script>
      </head>
      <body className={cn('min-h-screen font-body antialiased bg-background')}>
        <div className="relative flex min-h-screen flex-col" style={{ isolation: 'isolate' }}>
          <CursorGlow />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
