import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

// Dynamic backend URL based on platform
const getBackendUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:8082';
    //return 'http://10.31.23.48:8082';
  } else if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8082'; // Emulator
  } else {
    return 'http://192.168.8.119:8082'; // iOS and physical devices
    //return 'http://10.31.23.48:8082';
  }
};

export default function ResetPW() {
  const router = useRouter();
  const { email } = useLocalSearchParams(); // Get email from previous screen
  const [confirmationCode, setConfirmationCode] = useState('');
  const backendUrl = getBackendUrl(); // Use dynamic URL

  const handleVerify = async () => {
    if (!confirmationCode) {
      Alert.alert('Error', 'Please enter the confirmation code');
      return;
    }
    try {
      await axios.post(`${backendUrl}/api/reset/verify`, { email, code: confirmationCode });
      Alert.alert('Success', 'Code verified!');
      router.push({ pathname: '/ResetPW2', params: { email } });
    } catch (error) {
      Alert.alert('Error', 'Invalid code or verification failed.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.description}>
        Enter the confirmation code sent to {email}.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmation code"
        placeholderTextColor="#A9A9A9"
        keyboardType="numeric"
        autoCapitalize="none"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButtonSecondary} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 50,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 40,
  },
  verifyButton: {
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonSecondary: {
    backgroundColor: '#A9B8E8',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});