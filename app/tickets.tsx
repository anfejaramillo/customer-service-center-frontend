import { AppShell } from '@/components/layout/app-shell';

export default function TicketsScreen() {
  return (
    <AppShell
      pageCode='tickets'
      title="Tickets"
      subtitle="Track, open, and organize support tickets from a single workspace."
      actions={['List', 'Create', 'Assign', 'Close']}
    />
  );
}
