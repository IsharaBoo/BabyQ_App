import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert, ActivityIndicator, Platform } from 'react-native';
import Checkbox from 'expo-checkbox';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Dynamic backend URL based on platform
const getBackendUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:8082';
    //return  'http://10.31.23.48:8082';
  } else if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8082'; // Emulator
  } else {
    return 'http://192.168.8.119:8082'; // iOS and physical devices
    //return 'http://10.31.23.48:8082';
  }
};

const backendUrl = getBackendUrl();

const LoginPage: React.FC = () => {
  const router = useRouter();
  const bounceValue = useRef(new Animated.Value(0)).current;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('Using backend URL:', backendUrl); // Log to verify URL
    const loadCredentials = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberPassword(true);
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
          outputRange: [0, -8],
        }),
      },
    ],
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
  
    setIsLoading(true);
    console.log('Email entered:', email);
  
    try {
      console.log('Attempting doctor login at:', `${backendUrl}/api/doctors/login`);
      const doctorResponse = await axios.post(
        `${backendUrl}/api/doctors/login`,
        { professionalEmail: email, password },
        { timeout: 5000 }
      );
      console.log('Doctor login response:', doctorResponse.data);
  
      const doctorData = doctorResponse.data; // No token, just DoctorDTO
      const doctorUserData = {
        id: doctorData.id,
        name: `${doctorData.firstName} ${doctorData.lastName}`,
        email: doctorData.professionalEmail,
        role: 'Doctor',
        registrationDate: doctorData.registrationDate
          ? new Date(doctorData.registrationDate).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : 'Unknown',
        nicNumber: doctorData.nicNumber,
        phoneNumber: doctorData.phoneNumber,
        medicalLicenseNumber: doctorData.medicalLicenseNumber,
        affiliatedHospital: doctorData.affiliatedHospital,
        workplaceAddress: doctorData.workplaceAddress,
        position: doctorData.position,
        documentUrl: doctorData.documentUrl || null,
      };
  
      await AsyncStorage.setItem('userData', JSON.stringify(doctorUserData));
      console.log('Doctor login success:', { doctorUserData });
  
      if (rememberPassword) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
      } else {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
      }
  
      console.log('Navigating to /home');
      router.push('/home'); // Navigate to home
      Alert.alert('Success', 'Logged in as Healthcare Provider!');
    } catch (doctorError: any) {
      console.error('Doctor login failed:', doctorError.response?.data || doctorError.message);
  
      // Parent login fallback
      try {
        console.log('Attempting parent login at:', `${backendUrl}/api/parents/login`);
        const parentResponse = await axios.post(
          `${backendUrl}/api/parents/login`,
          { email, password },
          { timeout: 5000 }
        );
        const parentData = parentResponse.data;
        const parentUserData = {
          id: parentData.id,
          name: parentData.fullName || email.split('@')[0].replace(/[.\d]/g, ' ').trim(),
          email: parentData.email,
          role: 'Parent/Guardian',
          registrationDate: new Date().toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }),
          childName: parentData.childName || 'No child registered',
        };
  
        await AsyncStorage.setItem('userData', JSON.stringify(parentUserData));
        console.log('Parent login success:', { parentUserData });
        router.push('/home');
        Alert.alert('Success', 'Logged in as Parent/Guardian!');
      } catch (parentError: any) {
        console.error('Parent login failed:', parentError.response?.data || parentError.message);
        Alert.alert('Login Failed', parentError.response?.data || 'Invalid email or password');
      }
    } finally {
      setIsLoading(false);
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
            name={showPassword ? 'eye' : 'eye-off'}
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

      {isLoading && <ActivityIndicator size="small" color="#2D4BC2" style={{ marginVertical: 10 }} />}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading} activeOpacity={0.8}>
        <Text style={styles.loginText}>{isLoading ? 'Logging in...' : 'Login!'}</Text>
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