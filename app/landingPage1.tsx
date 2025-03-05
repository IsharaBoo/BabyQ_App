import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

export default function LandingPage1() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/landingPage2'); // Navigate to LandingPage2
  };

  return (
    <ImageBackground
      source={require('../assets/images/landingPic.png')} 
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.container} onPress={handleNavigation}>
          <Text style={styles.title}>Quality care</Text>
          <Text style={styles.subtitle}>for your little one</Text>
          <Text style={styles.subtitle}>all in one place</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    opacity: 0.5, 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF', 
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 30,
    color: '#FFFFFF', 
    textAlign: 'center',
  },
});