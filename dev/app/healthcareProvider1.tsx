import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

//const backendUrl = 'http://192.168.8.119:8082';
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

export default function HealthcareProviderRegistration1() {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [nicNumber, setNicNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isChecking, setIsChecking] = useState(false);

  const validateForm = () => {
    if (!firstName || !lastName || !nicNumber || !email || !password || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Error', 'Phone number must be 10 digits');
      return false;
    }
    return true;
  };

  // Optional: Check if email is already registered
  const checkEmailAvailability = async () => {
    try {
      setIsChecking(true);
      const response = await axios.get(`${getBackendUrl}/api/doctors`);
      const doctors = response.data;
      const emailExists = doctors.some((doctor: any) => doctor.professionalEmail === email);
      if (emailExists) {
        Alert.alert('Error', 'This email is already registered');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error checking email:', error);
      Alert.alert('Warning', 'Could not verify email availability. Proceeding anyway.');
      return true; // Proceed if check fails (optional)
    } finally {
      setIsChecking(false);
    }
  };

  const handleContinue = async () => {
    if (!validateForm() || isChecking) return;
  
    const emailAvailable = await checkEmailAvailability();
    if (!emailAvailable) return;
  
    router.push({
      pathname: '/healthcareProvider2',
      params: { firstName, lastName, nicNumber, email, password, phoneNumber },
    });
  };
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#2D4BC2" />
      </TouchableOpacity>

      <Text style={styles.title}>Get started your journey with us!</Text>

      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.active]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      <TextInput
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="NIC no"
        value={nicNumber}
        onChangeText={setNicNumber}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Professional email address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Set a Password (min 6 characters)"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#666"
        secureTextEntry
      />

      <TextInput
        placeholder="Phone number (10 digits)"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="phone-pad"
      />

      {isChecking && <ActivityIndicator size="small" color="#2D4BC2" style={{ marginVertical: 10 }} />}
      
      <TouchableOpacity style={styles.button} onPress={handleContinue} disabled={isChecking}>
        <Text style={styles.buttonText}>{isChecking ? 'Checking...' : 'Continue'}</Text>
      </TouchableOpacity>

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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  active: {
    backgroundColor: '#FFA500',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
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