import { AppShell } from '@/components/layout/app-shell';

export default function HomeScreen() {
  return (
    <AppShell
      pageCode='home'
      title="Home"
      subtitle="Welcome to Customer Service Center. Use the left panel actions for quick operations on this page."
      actions={['List', 'Create', 'Dashboard']}
    />
  );
}
