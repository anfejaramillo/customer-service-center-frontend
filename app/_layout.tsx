import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { AppFooter } from '@/components/layout/app-footer';
import { TopNavigation } from '@/components/layout/top-navigation';
import { NavItem } from '@/components/layout/types';
import { AuthConstants } from '@/constants/auth';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: AuthConstants.authority,
  client_id: AuthConstants.clientId,
  redirect_uri: process.env.EXPO_PUBLIC_LOGOUT_REDIRECT_URL || "http://localhost:8081",
  response_type: AuthConstants.response_type,
  scope: AuthConstants.scope,
}

const NAV_ITEMS: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/tickets', label: 'Tickets' },
  { href: '/messages', label: 'Messages' },
  { href: '/user-service', label: 'User Service' },
  { href: '/about-contact', label: 'About & Contact' },
];

export default function RootLayout() {
  const { width } = useWindowDimensions();
  const isCompact = width < 960;
  return (
    <>

      <AuthProvider {...cognitoAuthConfig}>
        <View style={styles.page}>
          <TopNavigation items={NAV_ITEMS} compact={isCompact} />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="tickets" />
            <Stack.Screen name="messages" />
            <Stack.Screen name="user-service" />
            <Stack.Screen name="about-contact" />
            <Stack.Screen name="auth" />
          </Stack>
          <AppFooter />
          <StatusBar style="auto" />
        </View>
      </AuthProvider>

    </>
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
