import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from react-native-vector-icons

export default function HealthcareProviderRegistration4() {
  const router = useRouter();

  const handleCompleteProfile = () => {
    router.replace('/home' as any); // Navigate to the Home Page
  };

  const handleGoBack = () => {
    router.back(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#2D4BC2" />
      </TouchableOpacity>

      <Text style={styles.title}>You successfully created your account!</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.active]} />
      </View>

      {/* Success Image */}
      <Image source={require('../assets/images/successHands.png')} style={styles.image} />

      {/* Complete Profile Button */}
      <TouchableOpacity style={styles.button} onPress={handleCompleteProfile}>
        <Text style={styles.buttonText}>Complete Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D4BC2',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 200, // Adjust the size based on your preference
    height: 200,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Progress bar styles
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  progressDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginHorizontal: 5,
    backgroundColor: '#d1d1d1', // Default color for inactive dots
  },
  completed: {
    backgroundColor: '#2D4BC2', // Color for completed steps
  },
  active: {
    backgroundColor: '#FFA500', // Color for the active step
  },
});