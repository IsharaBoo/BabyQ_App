import { Stack, useRouter, usePathname } from 'expo-router';
import { useEffect } from 'react';
import * as Linking from 'expo-linking';

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const { path, queryParams } = Linking.parse(event.url);
      console.log('Deep link received:', event.url);

      if (queryParams?.mode === 'resetPassword' && queryParams?.oobCode) {
        console.log('Navigating to ResetPW with oobCode:', queryParams.oobCode);
        router.push({
          pathname: './ResetPW',
          params: { oobCode: queryParams.oobCode },
        });
      }
    };

    // Listen for incoming deep links while the app is running
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Handle initial deep link if the app was opened via a link
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    // Cleanup the event listener on unmount
    return () => {
      subscription.remove();
    };
  }, [router, pathname]);

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
      
      <Stack.Screen name="doctorSearchResults" options={{ headerShown: false }} />
      <Stack.Screen name="ChannelHistory" options={{ headerShown: false }} />
      <Stack.Screen name="Channel" options={{ headerShown: false }} />
      <Stack.Screen name="community" options={{ headerShown: false }} />
      <Stack.Screen name="CHDR" options={{ headerShown: false }} />
      <Stack.Screen name="Feeding" options={{ headerShown: false }} />
      <Stack.Screen name="mental-health" options={{ headerShown: false }} />
      <Stack.Screen name="NewPost" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="EditProfileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="MyAppointmentsScreen" options={{ headerShown: false }} />
      
    </Stack>
  );
}