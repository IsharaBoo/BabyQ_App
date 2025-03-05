import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';

export default function ParentRegistration1() {
  const [fullName, setFullName] = useState('');
  const [nicNumber, setNicNumber] = useState('');
  const [dob, setDob] = useState({ month: '', day: '', year: '' });
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleContinue = () => {
    // Validation logic
    console.log('handleContinue called');
    if (!fullName || !nicNumber || !dob.day || !dob.month || !dob.year || !address || !phoneNumber || !email) {
      console.log('Validation failed: Please fill in all fields');
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      console.log('Validation failed: Please enter a valid phone number');
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      console.log('Validation failed: Please enter a valid email address');
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    console.log('Validation passed, navigating to /parent2');
    router.push('/parent2'); // Navigate to the next registration page
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up as a Parent/Guardian</Text>
      <Text style={styles.subtitle}>Start Your Journey with Us !</Text>

      {/* Full Name */}
      <TextInput
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* NIC Number */}
      <TextInput
        placeholder="NIC number"
        value={nicNumber}
        onChangeText={setNicNumber}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* Date of Birth */}
      <View style={styles.dobContainer}>
        <TextInput
          placeholder="DD"
          value={dob.day}
          onChangeText={(text) => setDob({ ...dob, day: text })}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={2}
        />
        <TextInput
          placeholder="MM"
          value={dob.month}
          onChangeText={(text) => setDob({ ...dob, month: text })}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={2}
        />
        <TextInput
          placeholder="YYYY"
          value={dob.year}
          onChangeText={(text) => setDob({ ...dob, year: text })}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={4}
        />
      </View>

      {/* Address */}
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* Phone Number */}
      <TextInput
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="phone-pad"
      />

      {/* Email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="email-address"
      />

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
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
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
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
  dobContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  dobInput: {
    width: '30%',
    height: 50,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#2D4BC2',
    textDecorationLine: 'underline',
  },
});