import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { auth } from './firebase';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';

export default function ResetPW() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const actionCode = params.oobCode as string; // Extract reset code from URL
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!actionCode) {
      Alert.alert('Error', 'Invalid or missing reset link.');
      router.push('/resetPassword');
    } else {
      verifyCode();
    }
  }, [actionCode]);

  const verifyCode = async () => {
    try {
      const userEmail = await verifyPasswordResetCode(auth, actionCode);
      setEmail(userEmail); // Save verified email
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Invalid or expired reset link.');
      router.push('/resetPassword');
    }
  };

  // 🔹 Handle new password submission
  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }
    try {
      await confirmPasswordReset(auth, actionCode, newPassword);
      Alert.alert('Success', 'Password changed successfully.');
      router.replace('/resetDone'); // Navigate to success page
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>
      <Text style={styles.description}>
        Enter a new password for your account ({email}).
      </Text>

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Confirm Reset</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D4BC2',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  resetButton: {
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
