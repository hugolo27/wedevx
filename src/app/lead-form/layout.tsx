import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lead Form - Alma LegalTech Frontend Assessment Project',
};

export default function LeadFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 