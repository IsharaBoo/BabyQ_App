import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in logo and text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Bounce animation for title
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to landing page after 3s
    const timer = setTimeout(() => {
      router.replace('/landingPage1');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateY: bounceValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  return (
    <LinearGradient colors={['#E6F0FF', '#FFFFFF']} style={styles.container}>
      <Animated.Image
        source={require('../assets/images/babyQlogo.png')}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="contain"
      />

      <Animated.View style={[styles.titleContainer, animatedStyle]}>
        <Text style={styles.title}>
          Baby<Text style={styles.titleHighlight}>Q</Text>
        </Text>
      </Animated.View>

      {/* Subtitle with Fade Animation */}
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
      Connecting Parents, Doctors, and Care!
      </Animated.Text>
     
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  titleContainer: {
    alignSelf: 'center',
    marginTop: -10,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    color: '#2D4BC2',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  titleHighlight: {
    color: '#FF6F91',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 16,
    color: '#4A4A4A',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
});


