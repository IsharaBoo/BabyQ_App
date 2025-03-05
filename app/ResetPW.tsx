import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ResetPW() {
  const router = useRouter();
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleVerify = () => {
    // Add your verification logic here
    // For example, validate the confirmation code and reset the password
    if (validateCode()) {
      alert('Password reset successful!');
      router.push('/ResetPW2'); // Navigate to the Reset Password Confirmation Screen
    }
  };

  const validateCode = () => {
    // Add your validation logic here
    // For example, check if the confirmation code is correct
    return confirmationCode.length === 4; // Example validation
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/resetPassword'); // Navigate to a specific screen if there is no previous screen
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
        style={styles.input}
        placeholder="Confirmation code"
        placeholderTextColor="#A9A9A9"
        keyboardType="numeric"
        autoCapitalize="none"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
      />

      {/* Verify Button */}
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
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