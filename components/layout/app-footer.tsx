import { StyleSheet, Text, View } from 'react-native';

export function AppFooter() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Footer.....</Text>
      <Text style={styles.text}>Made by Shadow Labs with Love</Text>
      <Text style={styles.text}>Simple Contact information</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    borderColor: '#101010',
    borderRadius: 24,
    backgroundColor: '#f2f2f2',
    paddingVertical: 18,
    paddingHorizontal: 26,
    marginTop: 20,
    minHeight: 120,
    justifyContent: 'center',
  },
  text: {
    color: '#171717',
    fontSize: 22,
    lineHeight: 30,
  },
});
