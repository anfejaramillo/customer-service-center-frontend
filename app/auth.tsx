import { AppShell } from '@/components/layout/app-shell';

export default function AuthScreen() {
  return (
    <AppShell
      pageCode='auth'
      title="Sign in / Sign up"
      subtitle="Authenticate users and manage account access from this secure entry point."
      actions={['Sign in', 'Sign up', 'Recover Password']}
    />
  );
}
