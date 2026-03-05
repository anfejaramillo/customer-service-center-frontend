import { AppShell } from '@/components/layout/app-shell';

export default function UserServiceScreen() {
  return (
    <AppShell
      pageCode='user-service'
      title="User Service"
      subtitle="Manage user service operations, priorities, and workflow improvements."
      actions={['Queue', 'Create Task', 'Escalations', 'Analytics']}
    />
  );
}
