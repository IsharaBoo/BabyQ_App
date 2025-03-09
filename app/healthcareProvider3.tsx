import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function HealthcareProviderRegistration3() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUri, setFileUri] = useState<string | null>(null);  // Local file URI
  const [isUploading, setIsUploading] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string | null>(null); // Firebase document URL

  // Retrieve data from previous pages
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
  };

  // Function to handle document selection
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
  
        // ✅ Upload to Firebase Storage
        const storage = getStorage();
        const fileRef = ref(storage, `documents/${file.name}`);
        const response = await fetch(file.uri);
        const blob = await response.blob();
  
        // Upload file
        await uploadBytes(fileRef, blob);
  
        // ✅ Get the file URL
        const downloadUrl = await getDownloadURL(fileRef);
        setFileUri(downloadUrl); // Setting Firebase download URL
        console.log('File uploaded successfully:', downloadUrl);
      }
    } catch (error) {
      console.error('Error picking/uploading document:', error);
      Alert.alert('Error', 'Failed to upload document');
    }
  };

  // Function to upload file to Firebase and proceed with registration
  const handleContinue = async () => {
    setIsUploading(true);
    
    if (fileUri) {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, `provider_documents/${providerData.email}/${fileName}`);

        // Convert file to Blob
        const response = await fetch(fileUri); // fileUri is the Firebase URL
        const blob = await response.blob();

        // Upload file
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        setDocumentUrl(downloadUrl);
        console.log('File uploaded successfully:', downloadUrl);

        // Proceed with registration
        navigateToNextScreen(downloadUrl);
      } catch (error) {
        console.error('File upload failed:', error);
        Alert.alert('Warning', 'Document upload failed, but registration will continue.');
        navigateToNextScreen(null);
      }
    } else {
      // No document uploaded, proceed
      navigateToNextScreen(null);
    }
  };

  // Navigate to the next screen with collected data
  const navigateToNextScreen = (uploadedFileUrl: string | null) => {
    setIsUploading(false);
    router.push({
      pathname: '/healthcareProvider4',
      params: {
        ...providerData,
        documentUrl: uploadedFileUrl || '', // Store URL if available
      },
    });
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
        <Text style={styles.buttonText}>{isUploading ? 'Uploading...' : 'Finish'}</Text>
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
