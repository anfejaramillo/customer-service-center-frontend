import { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type ActionsPanelProps = {
  title?: string;
  items: string[];
  links: Record<string, string>;
  compact?: boolean;
  setAction: Dispatch<SetStateAction<string>>
};

export function ActionsPanel({ title = "ACTION_TITLE", items, links = {}, compact = false, setAction }: ActionsPanelProps) {
  return (
    <View style={[styles.panel, compact && styles.panelCompact]}>
      {
        title !== "" ? <Text style={styles.item}>Actions for {title}</Text> : <Text style={styles.item}>See more at:</Text>
      }
      {items.map((item) => (
        <Pressable key={item} style={styles.actionButton} onPress={() => setAction(links[item])}>
          <Text style={styles.item}>- {item}</Text>
        </Pressable>
      ))}
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
  actionButton: {
    alignSelf: 'flex-start',
  },
});
