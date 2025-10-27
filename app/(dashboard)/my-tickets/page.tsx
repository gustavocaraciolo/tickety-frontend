import MyTicketsPage from '@/templates/MyTicketsPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function MyTickets() {
  return (
    <ProtectedRoute allowedRoles={['buyer']}>
      <MyTicketsPage />
    </ProtectedRoute>
  );
}
