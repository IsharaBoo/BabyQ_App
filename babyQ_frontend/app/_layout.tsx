import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="profile" options={{ title: "Parent Profile" }} />
      <Stack.Screen name="EditProfileScreen" options={{ title: "Edit Profile" }} />
      <Stack.Screen name="UpcomingVaccinationsScreen" options={{ title: "Vaccination" }} />
      <Stack.Screen name="UpcomingTestResultsScreen" options={{ title: "Test Results" }} />
      <Stack.Screen name="MyAppointmentsScreen" options={{ title: "Appoinments" }} />
    </Stack>
  );
}
