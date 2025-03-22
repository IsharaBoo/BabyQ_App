import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface DOB {
  month: string;
  day: string;
  year: string;
}

const ParentRegistration1: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>('');
  const [nicNumber, setNicNumber] = useState<string>('');
  const [dob, setDob] = useState<DOB>({ month: '', day: '', year: '' });
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleContinue = () => {
    setIsLoading(true);
    if (!fullName || !nicNumber || !dob.day || !dob.month || !dob.year || !address || !phoneNumber || !email) {
      Alert.alert('Error', 'Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      setIsLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    const dobString = `${dob.year}-${dob.month.padStart(2, '0')}-${dob.day.padStart(2, '0')}`;
    const dobDate = new Date(dobString);
    if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
      Alert.alert('Error', 'Please enter a valid date of birth');
      setIsLoading(false);
      return;
    }

    router.push({
      pathname: '/parent2',
      params: {
        fullName,
        nicNumber,
        dateOfBirth: dobString, // Pass as ISO string for backend
        address,
        phoneNumber,
        email,
      },
    });
    setIsLoading(false);
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#2D4BC2" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign up as a Parent/Guardian</Text>
      <Text style={styles.subtitle}>Start Your Journey with Us!</Text>

      <TextInput placeholder="Full name" value={fullName} onChangeText={setFullName} style={styles.input} placeholderTextColor="#666" />
      <TextInput placeholder="NIC number" value={nicNumber} onChangeText={setNicNumber} style={styles.input} placeholderTextColor="#666" />
      <View style={styles.dobContainer}>
        <TextInput
          placeholder="DD"
          value={dob.day}
          onChangeText={(text: string) => setDob((prev) => ({ ...prev, day: text }))}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={2}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="MM"
          value={dob.month}
          onChangeText={(text: string) => setDob((prev) => ({ ...prev, month: text }))}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={2}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="YYYY"
          value={dob.year}
          onChangeText={(text: string) => setDob((prev) => ({ ...prev, year: text }))}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={4}
          keyboardType="numeric"
        />
      </View>
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} placeholderTextColor="#666" />
      <TextInput
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Loading...' : 'Continue'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
});

export default ParentRegistration1;
