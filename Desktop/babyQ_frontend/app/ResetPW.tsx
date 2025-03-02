import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ResetPW() {
  const router = useRouter();
  const [confirmationCode, setConfirmationCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (validateCode()) {
      alert('Password reset successful!');
      router.push('/ResetPW2'); // Navigate to the Reset Password Confirmation Screen
    }
  };

  const validateCode = () => {
    if (!/^\d{4}$/.test(confirmationCode)) {
      setError('Enter a valid 4-digit code.');
      return false;
    }
    setError('');
    return true;
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/resetPassword'); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title & Description */}
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.description}>
        Enter the confirmation code to reset your password.
      </Text>

      {/* Confirmation Code Input */}
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="Enter 4-digit code"
        placeholderTextColor="#A9A9A9"
        keyboardType="numeric"
        maxLength={4}
        value={confirmationCode}
        onChangeText={(text) => {
          setConfirmationCode(text.replace(/[^0-9]/g, '')); // Only allow numbers
          setError(''); // Clear error when user types
        }}
      />

      {/* Show Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Verify Button - Disabled Until Valid */}
      <TouchableOpacity 
        style={[styles.verifyButton, confirmationCode.length === 4 ? {} : styles.disabledButton]}
        onPress={handleVerify}
        disabled={confirmationCode.length !== 4}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButtonSecondary} onPress={handleBack}>
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
    fontSize: 16,
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
    marginBottom: 10,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: '#FFE5E5',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // Grey out when disabled
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
