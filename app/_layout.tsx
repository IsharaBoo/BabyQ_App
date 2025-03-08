import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="landingPage2" options={{ headerShown: false }} />
      <Stack.Screen name="landingPage1" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="registerSelect" options={{ headerShown: false }} />
      <Stack.Screen name="parent1" options={{ headerShown: false }} />
      <Stack.Screen name="parent2" options={{ headerShown: false }} />
      <Stack.Screen name="healthcareProvider1" options={{ headerShown: false }} />
      <Stack.Screen name="healthcareProvider2" options={{ headerShown: false }} />
      <Stack.Screen name="healthcareProvider3" options={{ headerShown: false }} />
      <Stack.Screen name="healthcareProvider4" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
      <Stack.Screen name="ResetPW" options={{ headerShown: false }} />
      <Stack.Screen name="ResetPW2" options={{ headerShown: false }} />
      <Stack.Screen name="resetDone" options={{ headerShown: false }} />
      <Stack.Screen name="doctorCategory" options={{ headerShown: false }} />
      <Stack.Screen name="doctorProfile" options={{ headerShown: false }} />
      <Stack.Screen name="doctorSearchResults" options={{ headerShown: false }} />
      <Stack.Screen name="DoctorHomePage" options={{ headerShown: false }} />
      <Stack.Screen name="DoctorProfile" options={{ headerShown: false }} />
      <Stack.Screen name="DoctorProfileEdit" options={{ headerShown: false }} />
      <Stack.Screen name="DoctorProfileEdit2" options={{ headerShown: false }} />
    </Stack>
  );
}