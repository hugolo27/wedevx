import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alma LegalTech Frontend Assessment Project",
  description: "Lead management system for Alma LegalTech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased tracking-wide`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
