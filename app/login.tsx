import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Corrected import for the same directory
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing the email and password

const LoginPage: React.FC = () => {
  const router = useRouter();
  const bounceValue = useRef(new Animated.Value(0)).current;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberPassword, setRememberPassword] = useState<boolean>(false); // Remember me state

  useEffect(() => {
    // Check if there is any stored email and password
    const loadCredentials = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberPassword(true); // Remember the user is checked
      }
    };

    loadCredentials();

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
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateY: bounceValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8] as [number, number], // TypeScript requires explicit tuple
        }),
      },
    ],
  };

  const handleLogin = async () => {
    console.log("Email entered:", email);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");

      // Save the email and password to AsyncStorage if "Remember Me" is checked
      if (rememberPassword) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } else {
        // Remove credentials from AsyncStorage if not remembered
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }

      router.replace('/home');
    } catch (error: unknown) {
      // TypeScript doesn't know error type by default, so we cast it
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Login error:", errorMessage);
      Alert.alert("Login Failed", errorMessage);
    }
  };

  return (
    <LinearGradient colors={['#E6F0FF', '#FFFFFF']} style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#2D4BC2" />
      </TouchableOpacity>

      <Animated.View style={[styles.welcomeContainer, animatedStyle]}>
        <Text style={styles.welcomeText}>Welcome</Text>
      </Animated.View>

      <View style={styles.inputContainer}>
        <FontAwesome name="user-plus" size={22} color="#2D4BC2" style={styles.icon} />
        <TextInput
          placeholder="Email address"
          style={styles.input}
          placeholderTextColor="#7A7A7A"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={22} color="#2D4BC2" style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#7A7A7A"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={22}
            color="#2D4BC2"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/resetPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={rememberPassword}
          onValueChange={setRememberPassword}
          color="#2D4BC2"
        />
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
        <Text style={styles.loginText}>Login!</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/registerSelect')} style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Don't have an account? <Text style={styles.registerLink}>Register</Text>
        </Text>
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
    backgroundColor: '#2D4BC2',
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
  registerContainer: {
    marginTop: 20,
  },
  registerText: {
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  registerLink: {
    color: '#2D4BC2',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    fontSize: 14,
    color: '#4A4A4A',
    marginLeft: 10,
  },
});

export default LoginPage;
