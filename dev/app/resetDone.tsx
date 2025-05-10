import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function ResetDone() {
  const router = useRouter();

  const handleBackToLogin = () => {
    router.replace('/login'); // Navigate to the Login Page using router
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Success Message */}
      <Text style={styles.title}>Password changed</Text>

      {/* Tick Image */}
      <Image source={require('../assets/images/tick.png')} style={styles.tickImage} resizeMode="contain" />

      {/* Back to Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleBackToLogin}>
        <Text style={styles.loginButtonText}>Back to login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  tickImage: {
    width: 100,
    height: 100,
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D4BC2',
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
