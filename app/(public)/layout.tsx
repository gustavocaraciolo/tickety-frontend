import PublicLayout from '@/components/PublicLayout';
import Providers from './providers';

// Forçar renderização dinâmica para todas as páginas públicas
export const dynamic = 'force-dynamic';

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <PublicLayout>{children}</PublicLayout>
    </Providers>
  );
}