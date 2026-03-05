import { StyleSheet, Text, View } from 'react-native';

type ActionsPanelProps = {
  items: string[];
  compact?: boolean;
};

export function ActionsPanel({ items, compact = false }: ActionsPanelProps) {
  return (
    <View style={[styles.panel, compact && styles.panelCompact]}>
      <Text style={styles.title}>Actions (For specific page)</Text>

      {items.map((item) => (
        <Text key={item} style={styles.item}>
          - {item}
        </Text>
      ))}

      <Text style={styles.item}>....</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    width: 220,
    borderWidth: 3,
    borderColor: '#101010',
    borderRadius: 40,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 20,
    paddingVertical: 28,
    gap: 18,
  },
  panelCompact: {
    width: '100%',
    borderRadius: 22,
  },
  title: {
    color: '#191919',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 34,
  },
  item: {
    color: '#252525',
    fontSize: 20,
    lineHeight: 30,
  },
});
