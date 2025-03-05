import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from react-native-vector-icons

export default function HealthcareProviderRegistration2() {
  const router = useRouter();
  const [medicalLicenseNumber, setMedicalLicenseNumber] = useState('');
  const [affiliatedHospital, setAffiliatedHospital] = useState('');
  const [workplaceAddress, setWorkplaceAddress] = useState('');
  const [position, setPosition] = useState('');

  // Validation function
  const validateForm = () => {
    if (
      !medicalLicenseNumber.trim() ||
      !affiliatedHospital.trim() ||
      !workplaceAddress.trim() ||
      !position.trim()
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (validateForm()) {
      router.push('/healthcareProvider3');
    }
  };

  const handleGoBack = () => {
      router.back(); // Navigate back to the previous screen
    };
  
    return (
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#2D4BC2" />
        </TouchableOpacity>
  

      <Text style={styles.title}>You're almost there!</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.active]} />
        <View style={[styles.progressDot]} />
        <View style={styles.progressDot} />
      </View>

      {/* Medical License Number */}
      <TextInput
        placeholder="Medical licence number"
        value={medicalLicenseNumber}
        onChangeText={setMedicalLicenseNumber}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* Affiliated Hospital/Clinic */}
      <TextInput
        placeholder="Affiliated hospital/ clinic"
        value={affiliatedHospital}
        onChangeText={setAffiliatedHospital}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* Workplace Address */}
      <TextInput
        placeholder="Workplace Address"
        value={workplaceAddress}
        onChangeText={setWorkplaceAddress}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* Position */}
      <TextInput
        placeholder="Position"
        value={position}
        onChangeText={setPosition}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D4BC2',
    marginBottom: 30,
    textAlign: 'center',
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
    width: '100%',
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});