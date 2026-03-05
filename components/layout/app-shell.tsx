import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { ActionsPanel } from './actions-panel';
import { AppFooter } from './app-footer';
import { MainContent } from './main-content';
import { TopNavigation } from './top-navigation';
import type { NavItem } from './types';

type AppShellProps = {
  pageCode : string;
  title: string;
  subtitle: string;
  actions: string[];
};

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/tickets', label: 'Tickets' },
  { href: '/messages', label: 'Messages' },
  { href: '/user-service', label: 'User Service' },
  { href: '/about-contact', label: 'About & Contact' },
];

export function AppShell({ title, subtitle, actions, pageCode }: AppShellProps) {
  const { width } = useWindowDimensions();
  const isCompact = width < 960;

  return (
    <View style={styles.page}>
      <TopNavigation items={NAV_ITEMS} compact={isCompact} />

      <View style={[styles.mainRow, isCompact && styles.mainRowCompact]}>
        {
          pageCode === 'home' || pageCode === 'auth' ? <></> : <ActionsPanel items={actions} compact={isCompact} />
        }
        <MainContent title={title} subtitle={subtitle} />
      </View>

      <AppFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#dddddd',
    paddingHorizontal: 26,
    paddingTop: 22,
    paddingBottom: 24,
  },
  mainRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    gap: 18,
  },
  mainRowCompact: {
    flexDirection: 'column',
  },
});
