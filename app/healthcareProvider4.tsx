import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Animated, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const backendUrl = 'http://192.168.1.5:8082';

export default function HealthcareProviderRegistration4() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const providerData = {
    firstName: params.firstName as string,
    lastName: params.lastName as string,
    nicNumber: params.nicNumber as string,
    email: params.email as string,
    password: params.password as string,
    phoneNumber: params.phoneNumber as string,
    medicalLicenseNumber: params.medicalLicenseNumber as string,
    affiliatedHospital: params.affiliatedHospital as string,
    workplaceAddress: params.workplaceAddress as string,
    position: params.position as string,
    photoUrl: params.photoUrl as string, // From HealthcareProviderRegistration2
  };

  // Animation for title
  const titleOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(titleOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/png'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setFileName(file.name);
        setFileUri(file.uri);
        console.log('File selected:', file.name);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to select document');
    }
  };

  const handleCompleteProfile = async () => {
    setIsUploading(true);

    try {
      let documentUrl = providerData.photoUrl || null; // Use photoUrl as default if no document
      if (fileUri) {
        const formData = new FormData();
        formData.append('file', {
          uri: fileUri,
          name: fileName || 'document',
          type: 'application/octet-stream',
        } as any);
        formData.append('email', providerData.email);

        try {
          const uploadResponse = await axios.post(`${backendUrl}/api/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          documentUrl = uploadResponse.data.url; // Override with document if uploaded
          console.log('Document uploaded:', documentUrl);
        } catch (uploadError) {
          console.warn('Document upload failed, proceeding without it:', uploadError);
          Alert.alert('Warning', 'Document upload failed, but registration will continue.');
        }
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
      console.log('Provider registered:', registeredDoctor);

      const userData = {
        id: registeredDoctor.id,
        name: `${registeredDoctor.firstName} ${registeredDoctor.lastName}`,
        email: registeredDoctor.professionalEmail,
        role: 'Healthcare Provider',
        registrationDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
        nicNumber: registeredDoctor.nicNumber,
        phoneNumber: registeredDoctor.phoneNumber,
        medicalLicenseNumber: registeredDoctor.medicalLicenseNumber,
        affiliatedHospital: registeredDoctor.affiliatedHospital,
        workplaceAddress: registeredDoctor.workplaceAddress,
        position: registeredDoctor.position,
        photoUrl: providerData.photoUrl || null,
        documentUrl: registeredDoctor.documentUrl || null,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data saved to AsyncStorage:', userData);

      Alert.alert('Success', 'Healthcare provider registered successfully! Please log in.', [
        { text: 'OK', onPress: () => router.push('/home') },
      ]);
    } catch (error: any) {
      console.error('Error registering provider:', error.response?.data || error.message);
      Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#2D4BC2" />
      </TouchableOpacity>

      <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
        You successfully created your account!
      </Animated.Text>

      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.active]} />
      </View>

      <Image source={require('../assets/images/successHands.png')} style={styles.image} />

      <Text style={styles.instructions}>
        Please upload a document proving your affiliation (optional).
      </Text>

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload} disabled={isUploading}>
        <Ionicons name="document-attach-outline" size={35} color="#2D4BC2" />
        <Ionicons name="add-circle" size={20} color="#2D4BC2" style={styles.plusIcon} />
      </TouchableOpacity>

      {fileName ? (
        <Text style={styles.fileName}>{fileName}</Text>
      ) : (
        <Text style={styles.fileFormats}>PDF, JPG, PNG</Text>
      )}

      {isUploading && <ActivityIndicator size="small" color="#2D4BC2" style={{ marginVertical: 10 }} />}

      <TouchableOpacity style={styles.button} onPress={handleCompleteProfile} disabled={isUploading}>
        <Text style={styles.buttonText}>{isUploading ? 'Registering...' : 'Complete Profile'}</Text>
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
    marginBottom: 30,
  },
  progressDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginHorizontal: 5,
    backgroundColor: '#d1d1d1',
  },
  completed: {
    backgroundColor: '#2D4BC2',
  },
  active: {
    backgroundColor: '#FFA500',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
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