import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { Providers } from './providers';
import './globals.css';

/** Metadata for the Narys application starter. */
export const metadata: Metadata = { title: 'Narys' };

/** Mounts the starter application and its browser providers. */
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
