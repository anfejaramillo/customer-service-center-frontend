import { AppShell } from '@/components/layout/app-shell';

export default function MessagesScreen() {
  return (
    <AppShell
      pageCode='messages'
      title="Messages"
      subtitle="Review customer messages and keep communication timelines clear and centralized."
      actions={['Inbox', 'New Message', 'Templates', 'Archive']}
    />
  );
}
