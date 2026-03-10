import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NavItem } from './types';

import { AuthPanel } from './auth-panel';

import React from 'react';

type TopNavigationProps = {
  items: NavItem[];
  compact?: boolean;
};

export function TopNavigation({ items, compact = false }: TopNavigationProps) {
  
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={[styles.row, compact && styles.rowCompact]}>
      <View style={[styles.navContainer, compact && styles.navContainerCompact]}>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Pressable
              key={item.href}
              onPress={() => router.push(item.href)}
              style={[styles.navItem, isActive && styles.navItemActive]}>
              <Text style={[styles.navText, isActive && styles.navTextActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <AuthPanel compact={compact}></AuthPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rowCompact: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 3,
    borderColor: '#101010',
    borderRadius: 14,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 12,
    minHeight: 52,
  },
  navContainerCompact: {
    justifyContent: 'flex-start',
    gap: 4,
  },
  navItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  navItemActive: {
    backgroundColor: '#dedede',
  },
  navText: {
    color: '#191919',
    fontSize: 15,
    fontWeight: '500',
  },
  navTextActive: {
    fontWeight: '700',
  },
  authButton: {
    borderWidth: 3,
    borderColor: '#101010',
    borderRadius: 14,
    backgroundColor: '#f3f3f3',
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  authButtonCompact: {
    alignSelf: 'flex-start',
  },
  authText: {
    color: '#191919',
    fontSize: 15,
    fontWeight: '600',
  },
});
