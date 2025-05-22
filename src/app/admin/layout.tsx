import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Alma LegalTech Frontend Assessment Project',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 