import PublicLayout from '@/components/PublicLayout';
import Providers from './providers';

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <PublicLayout>{children}</PublicLayout>
    </Providers>
  );
}