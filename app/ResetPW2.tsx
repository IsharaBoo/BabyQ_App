import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ResetPW2() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    // Add your password change logic here
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    // Simulate a successful password change
    alert('Password changed successfully!');
    router.push('/resetDone'); // Navigate to the Reset Done screen
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Title & Description */}
      <Text style={styles.title}>Change your password</Text>
      <Text style={styles.description}>
        Enter the new password to reset your password.
      </Text>

      {/* New Password Input */}
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
          <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
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
          <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Change Button */}
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
    fontSize: 16,
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
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#2D4BC2', // Solid blue color
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 5,
    marginLeft: 20,
    marginTop: 20,
  },
  changeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  
});