import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import FavoriteProvider from './context/FavoriteContext';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Cinematografía en Colombia - Producción de Películas y Videos',
  description:
    'Compañía líder en cinematografía en Colombia, especializada en la producción de películas, videos corporativos y comerciales de alta calidad.',
  keywords: [
    'Cinematografía en Colombia',
    'Cinema',
    'Producción de Películas',
    'Videos Corporativos',
    'Comerciales en Colombia',
    'Servicios Cinematográficos',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    description:
      'Compañía de cinematografía en Colombia especializada en producción de películas y comerciales de alta calidad.',
    siteName: 'Cinematografía Colombia',
    title: 'Cinematografía en Colombia-Producción de Películas y Videos',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='mb-2 mt-6'>
        <Suspense>
          <Navbar />
          <div className='grid grid-cols-1 sm:grid-cols-[200px,1fr]'>
            <Sidebar />
            <div className='px-6 py-2'>
              <FavoriteProvider>{children}</FavoriteProvider>
            </div>
          </div>
        </Suspense>
      </body>
    </html>
  );
}
