import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  
  const backendUrl = 'http://192.168.8.119:8082'; // Adjust to your backend URL

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }
    try {
      // Simulate sending reset code
      await axios.post(`${backendUrl}/api/reset/send`, { email });
      Alert.alert('Success', 'A reset code has been sent to your email.');
      router.push({ pathname: '/ResetPW', params: { email } });
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset code. Try again.');
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
        Enter the email address you used when you signed up, and we’ll email a link to reset your password.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#A9A9A9"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset</Text>
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
  resetButton: {
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  resetButtonText: {
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