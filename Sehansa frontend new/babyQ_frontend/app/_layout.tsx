import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Healthcare Provider Profile" }}
      />
      <Stack.Screen
        name="profile-setup"
        options={{ title: "Healthcare Provider Profile Setup" }}
      />
      <Stack.Screen
        name="provider-schedule"
        options={{ title: "Healthcare Provider Implementation" }}
      />
    </Stack>
  );
}