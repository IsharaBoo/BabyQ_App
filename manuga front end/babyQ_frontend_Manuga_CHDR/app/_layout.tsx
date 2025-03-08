import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Feeding" options={{ headerShown: false }} />
      <Stack.Screen name="mental-health" options={{ title: 'Mental Health Guidance' }} />
      <Stack.Screen name="milestones" options={{ title: 'Development Milestones' }} />
      <Stack.Screen name="newborn-care" options={{ title: 'Newborn Care Guidelines' }} />
      {/* <Stack.Screen name="landingPage1" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="registerSelect" options={{ headerShown: false }} />
      <Stack.Screen name="parent1" options={{ headerShown: false }} />
      <Stack.Screen name="parent2" options={{ headerShown: false }} />
      <Stack.Screen name="healthcareProvider1" options={{ headerShown: false }} />
      <Stack.Screen name="healthcareProvider2" options={{ headerShown: false }} />
      <Stack.Screen name="healthcareProvider3" options={{ headerShown: false }} />
      <Stack.Screen name="healthcareProvider4" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="resetPassword1" options={{ headerShown: false }} />
      <Stack.Screen name="ResetPW" options={{ headerShown: false }} />
      <Stack.Screen name="ResetPW2" options={{ headerShown: false }} />
      <Stack.Screen name="resetDone" options={{ headerShown: false }} /> */}
    </Stack>
  );
}