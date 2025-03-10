import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function HealthcareProviderRegistration2() {
  const router = useRouter();
  const params = useLocalSearchParams();

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
  const [photoUri, setPhotoUri] = useState<string | null>(null); // Store photo URI

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Error', 'Permission to access photos is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const validateForm = () => {
    if (!medicalLicenseNumber || !affiliatedHospital || !workplaceAddress || !position || !photoUri) {
      Alert.alert('Error', 'Please fill in all fields and upload a photo');
      return false;
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateForm()) return;

    router.push(
      `/healthcareProvider3?firstName=${encodeURIComponent(providerData.firstName)}&lastName=${encodeURIComponent(providerData.lastName)}&nicNumber=${encodeURIComponent(providerData.nicNumber)}&email=${encodeURIComponent(providerData.email)}&password=${encodeURIComponent(providerData.password)}&phoneNumber=${encodeURIComponent(providerData.phoneNumber)}&medicalLicenseNumber=${encodeURIComponent(medicalLicenseNumber)}&affiliatedHospital=${encodeURIComponent(affiliatedHospital)}&workplaceAddress=${encodeURIComponent(workplaceAddress)}&position=${encodeURIComponent(position)}&photoUri=${encodeURIComponent(photoUri || '')}`
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

      {/* Photo Upload Section */}
      <TouchableOpacity style={styles.uploadButtonContainer} onPress={pickImage} activeOpacity={0.8}>
        <LinearGradient
          colors={['#A9B8E8', '#2D4BC2']} // Gradient from light blue to primary blue
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.uploadButtonGradient}
        >
          <Ionicons name="camera" size={24} color="#FFFFFF" style={styles.uploadIcon} />
          <Text style={styles.uploadButtonText}>
            {photoUri ? 'Change The Photo' : 'Upload a Professional Photo'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.photoPreview} />
      )}

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
    marginTop: -50,
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
  uploadButtonContainer: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden', // Ensures gradient respects border radius
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  uploadButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  uploadIcon: {
    marginRight: 10,
  },
  uploadButtonText: {
    color: '#FFFFFF', // White text for contrast on gradient
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  button: {
    width: '90%',
    backgroundColor: '#2D4BC2',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
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