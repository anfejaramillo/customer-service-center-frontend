import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="tickets" />
        <Stack.Screen name="messages" />
        <Stack.Screen name="user-service" />
        <Stack.Screen name="about-contact" />
        <Stack.Screen name="auth" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
