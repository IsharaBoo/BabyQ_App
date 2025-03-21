import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//const backendUrl = 'http://192.168.8.119:8082';
const backendUrl = 'http://10.31.23.48:8082';

export default function HealthcareProviderRegistration3() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const providerData = {
    firstName: (params.firstName as string) || '',
    lastName: (params.lastName as string) || '',
    nicNumber: (params.nicNumber as string) || '',
    email: (params.email as string) || '',
    password: (params.password as string) || '',
    phoneNumber: (params.phoneNumber as string) || '',
    medicalLicenseNumber: (params.medicalLicenseNumber as string) || '',
    affiliatedHospital: (params.affiliatedHospital as string) || '',
    workplaceAddress: (params.workplaceAddress as string) || '',
    position: (params.position as string) || '',
    photoUrl: (params.photoUrl as string) || null,
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/png'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const { name, uri, mimeType } = result.assets[0];
        setFileName(name);
        setFileUri(uri);
        setFileType(mimeType || 'application/octet-stream');
        console.log('File selected:', { name, uri, mimeType });
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to select document');
    }
  };

  const handleContinue = async () => {
    if (!providerData.email || !providerData.password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    setIsUploading(true);

    try {
      let documentUrl = providerData.photoUrl || null;

      if (fileUri) {
        const formData = new FormData();
        formData.append('file', {
          uri: fileUri,
          name: fileName || 'document',
          type: fileType || 'application/octet-stream',
        } as any);

        const uploadResponse = await axios.post(`${backendUrl}/api/doctors/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        documentUrl = uploadResponse.data.url; // Match backend response
        console.log('Document uploaded:', documentUrl);
      }

      const providerPayload = {
        firstName: providerData.firstName,
        lastName: providerData.lastName,
        nicNumber: providerData.nicNumber,
        professionalEmail: providerData.email,
        password: providerData.password,
        phoneNumber: providerData.phoneNumber,
        medicalLicenseNumber: providerData.medicalLicenseNumber,
        affiliatedHospital: providerData.affiliatedHospital,
        workplaceAddress: providerData.workplaceAddress,
        position: providerData.position,
        documentUrl: documentUrl || null,
      };

      const response = await axios.post(`${backendUrl}/api/doctors`, providerPayload);
      const registeredDoctor = response.data;

      const userData = {
        id: registeredDoctor.id,
        name: `${registeredDoctor.firstName} ${registeredDoctor.lastName}`,
        email: registeredDoctor.professionalEmail,
        role: 'Healthcare Provider',
        registrationDate: registeredDoctor.registrationDate
          ? new Date(registeredDoctor.registrationDate).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
          : 'Unknown',
        nicNumber: registeredDoctor.nicNumber,
        phoneNumber: registeredDoctor.phoneNumber,
        medicalLicenseNumber: registeredDoctor.medicalLicenseNumber,
        affiliatedHospital: registeredDoctor.affiliatedHospital,
        workplaceAddress: registeredDoctor.workplaceAddress,
        position: registeredDoctor.position,
        photoUrl: documentUrl || null,
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data saved:', userData);

      router.push({
        pathname: '/healthcareProvider4',
        params: { ...userData }, // Pass registered data to next screen
      });
    } catch (error: any) {
      console.error('Registration error:', error.response?.data || error.message);
      Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred during registration');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#2D4BC2" />
      </TouchableOpacity>

      <Text style={styles.title}>Finish up!</Text>

      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.active]} />
        <View style={styles.progressDot} />
      </View>

      <Text style={styles.instructions}>
        Please upload a document proving your affiliation with your hospital or clinic (e.g., recent pay stub, employment letter, or hospital ID). This is optional.
      </Text>

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload} activeOpacity={0.8}>
        <Ionicons name="document-attach-outline" size={35} color="#2D4BC2" />
        <Ionicons name="add-circle" size={20} color="#2D4BC2" style={styles.plusIcon} />
      </TouchableOpacity>

      {fileName ? (
        <Text style={styles.fileName}>{fileName}</Text>
      ) : (
        <Text style={styles.fileFormats}>PDF, JPG, PNG</Text>
      )}

      {isUploading && <ActivityIndicator size="small" color="#2D4BC2" style={{ marginVertical: 10 }} />}

      <TouchableOpacity style={styles.button} onPress={handleContinue} disabled={isUploading}>
        <Text style={styles.buttonText}>{isUploading ? 'Registering...' : 'Finish'}</Text>
      </TouchableOpacity>

      <View style={styles.decorativeDots}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
      </View>
    </View>
  );
}

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    paddingHorizontal: 10,
  },
  uploadButton: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  fileName: {
    fontSize: 14,
    color: '#2D4BC2',
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  fileFormats: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 20,
  },
  button: {
    width: '90%',
    backgroundColor: '#2D4BC2',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
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
  plusIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
  },
});