import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { ActionsPanel } from './actions-panel';
import { MainContent } from './main-content';
import type { NavItem } from './types';

import { useAuth } from "react-oidc-context";

type AppShellProps = {
  pageCode: string;
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
  let auth = useAuth();
  const { width } = useWindowDimensions();
  const isCompact = width < 960;
  
  return (
    <View style={styles.page}>
      <View style={[styles.mainRow, isCompact && styles.mainRowCompact]}>
        {
          (pageCode === 'home' || pageCode === 'auth') || !auth.isAuthenticated ? <></> : <ActionsPanel title="" items={actions} compact={isCompact} />
        }
        {
          auth.isAuthenticated || (pageCode === 'home' || pageCode === 'auth') ? <MainContent title={title} subtitle={subtitle} /> : <MainContent title={"You do not have enough permissions"} subtitle={"Please, log in with user with permisions needed."} />
        }
      </View>
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
