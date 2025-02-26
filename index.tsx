import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  useEffect(() => {
    // Simulate a delay for the splash screen
    const timer = setTimeout(() => {
      router.replace('/landingPage1' as any); 
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={require('../assets/images/babyQlogo.png')} // Path to your image
        style={styles.image}
        resizeMode="contain"
      />

      {/* Text */}
      <Text style={styles.title}>BabyQ</Text>
      <Text style={styles.subtitle}>HEALTHCARE SOLUTION</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 150, // Adjust the size as needed
    height: 150, // Adjust the size as needed
    marginBottom: 20, // Space between image and text
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D4BC2',
  },
  subtitle: {
    fontSize: 18,
    color: '#05685E',
    marginTop: 10,
  },
});