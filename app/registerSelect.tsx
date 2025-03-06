import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// TypeScript interface for animated values
interface AnimatedStyles {
  bounce: Animated.Value;
}

const RegistrationSelectPage: React.FC = () => {
  // Animation setup for the title
  const bounceValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceValue]);

  const animatedStyle = {
    transform: [
      {
        translateY: bounceValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8],
        }),
      },
    ],
  };

  return (
    <LinearGradient
      colors={['#E6F0FF', '#FFFFFF']}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#2D4BC2" />
      </TouchableOpacity>

      {/* Title */}
      <Animated.View style={[styles.titleContainer, animatedStyle]}>
        <Text style={styles.title}>
        Who are you signing up as ?
        </Text>
      </Animated.View>

      {/* Parent/Guardian Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/parent1')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Parent/Guardian</Text>
      </TouchableOpacity>

      {/* Healthcare Provider Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/healthcareProvider1')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Healthcare Provider</Text>
      </TouchableOpacity>

      {/* Decorative Dots */}
      <View style={styles.decorativeDots}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  titleContainer: {
    marginBottom: 50,
    marginTop: -40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#2D4BC2',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    textAlign: 'center',
  },
  titleHighlight: {
    color: '#FF6F91',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#2D4BC2', // Solid blue to match LoginPage
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
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

export default RegistrationSelectPage;