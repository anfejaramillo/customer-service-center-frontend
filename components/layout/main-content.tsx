import { StyleSheet, Text, View } from 'react-native';

type MainContentProps = {
  title: string;
  subtitle: string;
};

export function MainContent({ title, subtitle }: MainContentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.gradientLayerA} />
      <View style={styles.gradientLayerB} />
      <View style={styles.gradientLayerC} />

      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#101010',
    backgroundColor: '#e9e9e9',
    overflow: 'hidden',
    justifyContent: 'center',
    padding: 28,
    minHeight: 420,
  },
  gradientLayerA: {
    position: 'absolute',
    right: -120,
    top: 20,
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: '#d7d7d7',
  },
  gradientLayerB: {
    position: 'absolute',
    right: -60,
    bottom: -180,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: '#c7c7c7',
  },
  gradientLayerC: {
    position: 'absolute',
    left: 90,
    bottom: -140,
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: '#efefef',
  },
  card: {
    borderWidth: 2,
    borderColor: '#171717',
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.75)',
    padding: 22,
    maxWidth: 620,
    gap: 10,
  },
  title: {
    color: '#171717',
    fontSize: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: '#303030',
    fontSize: 20,
    lineHeight: 30,
  },
});
