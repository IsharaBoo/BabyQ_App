import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function ResetPW2() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  
  // Dynamic backend URL based on platform
  const getBackendUrl = () => {
    if (Platform.OS === 'web') {
      return 'http://localhost:8082';
      //return 'http://10.31.23.48:8082';
    } else if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8082'; // Emulator
    } else {
      //return 'http://192.168.8.119:8082'; // iOS and physical devices
      return 'http://10.31.23.48:8082';
    }
  };
  
  const backendUrl = getBackendUrl(); // Use dynamic URL

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match. Please try again.');
      return;
    }
    if (!newPassword) {
      Alert.alert('Error', 'Please enter a new password.');
      return;
    }
    try {
      await axios.post(`${backendUrl}/api/reset/update`, { email, newPassword });
      Alert.alert('Success', 'Password changed successfully!');
      router.push('/resetDone');
    } catch (error) {
      Alert.alert('Error', 'Failed to update password.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Change Your Password</Text>
      <Text style={styles.description}>
        Enter your new password to reset it.
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={!showNewPassword}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeIcon}>
          <Ionicons name={showNewPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm new password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
          <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.changeButton} onPress={handleChangePassword}>
        <Text style={styles.changeButtonText}>Change</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  changeButton: {
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});