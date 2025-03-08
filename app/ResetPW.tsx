import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ResetPW(): JSX.Element {
  const router = useRouter();
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  const handleVerify = (): void => {
    if (validateCode()) {
      Alert.alert('Success', 'Password reset successful!');
      router.push('/ResetPW2'); // Navigate to confirmation screen
    } else {
      Alert.alert('Error', 'Invalid confirmation code.');
    }
  };

  const validateCode = (): boolean => {
    return confirmationCode.length === 4; // Example validation
  };

  const handleBack = (): void => {
    router.push('/resetPassword'); // Navigate back to reset password screen
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#2D4BC2" />
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
    top: 60,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D4BC2',
    textAlign: 'left',
    marginLeft: 45,
    marginTop: 15,
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
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#2D4BC2',
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 5,
    marginLeft: 20,
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  backButtonSecondary: {
    width: '90%',
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: '#A9B8E8',
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

