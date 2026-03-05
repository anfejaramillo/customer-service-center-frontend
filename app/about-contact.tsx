import { AppShell } from '@/components/layout/app-shell';

export default function AboutContactScreen() {
  return (
    <AppShell
      pageCode='about-contact'
      title="About & Contact"
      subtitle="Find details about the platform, support channels, and contact references."
      actions={['Company', 'Support', 'Privacy', 'Terms']}
    />
  );
}
