import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from react-native-vector-icons

export default function HealthcareProviderRegistration4() {
  const router = useRouter();

  const handleCompleteProfile = () => {
    router.replace('/home'); // Navigate to the Home Page
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
    
    {/* Decorative Dots */}
          <View style={styles.decorativeDots}>
            {Array.from({ length: 5 }).map((_, index) => (
              <View key={index} style={styles.dot} />
            ))}
          </View>
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
    fontSize: 30,
    fontWeight: '600',
    color: '#2D4BC2',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200, // Adjust the size based on your preference
    height: 200,
    marginBottom: 30,
  },
  button: {
    width: '90%',
    backgroundColor: '#2D4BC2',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
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
  decorativeDots: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6F91',
    opacity: 0.6,
  },
});