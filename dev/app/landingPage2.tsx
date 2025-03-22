import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Define TypeScript interface for animated values
interface AnimatedStyles {
  bounce: Animated.Value;
}

const LandingPage2: React.FC = () => {
  // Animation setup
  const bounceValue = new Animated.Value(0);

  React.useEffect(() => {
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
  }, [bounceValue]);

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
    <LinearGradient
      colors={['#E6F0FF', '#FFFFFF']}
      style={styles.container}
    >
      <Animated.View style={[styles.titleContainer, animatedStyle]}>
        <Text style={styles.title}>
          Baby<Text style={styles.titleHighlight}>Q</Text>
        </Text>
      </Animated.View>

      <Text style={styles.description}>
         Quality care, expert advice, and a supportive community all in one place.
      </Text>

      <Text style={styles.subDescription}>
      "Our app connects moms to trusted doctors, tracks growth milestones, and digitizes health records."
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/registerSelect')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#2D4BC2', '#2D4BC2']}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Create an Account</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => router.push('/home')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonSecondaryText}>Login</Text>
      </TouchableOpacity>

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
  titleContainer: {
    alignSelf: 'flex-start',
    marginBottom: 30,
    marginTop: -60,
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
  description: {
    fontSize: 18,
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Georgia', // Assuming custom font is loaded
    lineHeight: 26,
  },
  subDescription: {
    fontSize: 14,
    color: '#7A7A7A',
    textAlign: 'center',
    marginBottom: 50,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  button: {
    width: '90%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    backgroundColor: '#2D4BC2',
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  buttonSecondary: {
    width: '90%',
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#2D4BC2',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonSecondaryText: {
    color: '#2D4BC2',
    fontSize: 18,
    fontWeight: '600',
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

export default LandingPage2;