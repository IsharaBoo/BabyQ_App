import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// TypeScript interface for animated values
interface AnimatedStyles {
  bounce: Animated.Value;
}

const LoginPage: React.FC = () => {
  // Animation setup for the welcome text
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

  const handleLogin = () => {
    router.replace('/home');
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

      {/* Welcome Text */}
      <Animated.View style={[styles.welcomeContainer, animatedStyle]}>
        <Text style={styles.welcomeText}>
          Welcome
        </Text>
      </Animated.View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="user-plus" size={22} color="#2D4BC2" style={styles.icon} />
        <TextInput
          placeholder="Email address"
          style={styles.input}
          placeholderTextColor="#7A7A7A"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={22} color="#2D4BC2" style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#7A7A7A"
          secureTextEntry
        />
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => router.push('/resetPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.loginText}>Login!</Text>
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
  welcomeContainer: {
    marginBottom: 40,
    marginTop: -40,
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2D4BC2',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    width: '90%',
    borderWidth: 1,
    borderColor: '#D6E4FF',
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#4A4A4A',
  },
  forgotPassword: {
    color: '#2D4BC2',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
  loginButton: {
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#2D4BC2', // Solid blue color
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 5,
  },
  loginText: {
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

export default LoginPage;