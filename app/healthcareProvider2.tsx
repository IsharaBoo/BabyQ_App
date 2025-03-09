// app/HealthcareProviderRegistration2.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HealthcareProviderRegistration2() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve data from HealthcareProviderRegistration1
  const providerData = {
    firstName: params.firstName as string,
    lastName: params.lastName as string,
    nicNumber: params.nicNumber as string,
    email: params.email as string,
    password: params.password as string,
    phoneNumber: params.phoneNumber as string,
  };

  const [medicalLicenseNumber, setMedicalLicenseNumber] = useState<string>('');
  const [affiliatedHospital, setAffiliatedHospital] = useState<string>('');
  const [workplaceAddress, setWorkplaceAddress] = useState<string>('');
  const [position, setPosition] = useState<string>('');

  const validateForm = () => {
    if (!medicalLicenseNumber || !affiliatedHospital || !workplaceAddress || !position) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateForm()) return;

    // Pass all collected data to HealthcareProviderRegistration3 using query params
    router.push(
      `/healthcareProvider3?firstName=${encodeURIComponent(providerData.firstName)}&lastName=${encodeURIComponent(providerData.lastName)}&nicNumber=${encodeURIComponent(providerData.nicNumber)}&email=${encodeURIComponent(providerData.email)}&password=${encodeURIComponent(providerData.password)}&phoneNumber=${encodeURIComponent(providerData.phoneNumber)}&medicalLicenseNumber=${encodeURIComponent(medicalLicenseNumber)}&affiliatedHospital=${encodeURIComponent(affiliatedHospital)}&workplaceAddress=${encodeURIComponent(workplaceAddress)}&position=${encodeURIComponent(position)}`
    );
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#2D4BC2" />
      </TouchableOpacity>

      <Text style={styles.title}>You're almost there!</Text>

      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.active]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      <TextInput
        placeholder="Medical licence number"
        value={medicalLicenseNumber}
        onChangeText={setMedicalLicenseNumber}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Affiliated hospital/clinic"
        value={affiliatedHospital}
        onChangeText={setAffiliatedHospital}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Workplace Address"
        value={workplaceAddress}
        onChangeText={setWorkplaceAddress}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Position"
        value={position}
        onChangeText={setPosition}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.decorativeDots}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
      </View>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#2D4BC2',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  completed: {
    backgroundColor: '#2D4BC2',
  },
  active: {
    backgroundColor: '#FFA500',
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
  button: {
    width: '90%',
    backgroundColor: '#2D4BC2',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  decorativeDots: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6F91',
    opacity: 0.6,
  },
});