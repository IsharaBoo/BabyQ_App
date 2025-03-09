import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, firestore, storage } from './firebase';

export default function HealthcareProviderRegistration4() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve all provider data
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
    fileUri: params.fileUri as string,
    fileName: params.fileName as string,
  };

  // Create a reference for opacity animation
  const titleOpacity = useRef(new Animated.Value(0)).current;

  // Animate title on mount
  useEffect(() => {
    Animated.timing(titleOpacity, {
      toValue: 1, // Fade in fully
      duration: 1000, // Duration of the fade-in effect
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, []);

  const handleCompleteProfile = async () => {
    try {
      console.log("Starting registration process...");
      console.log("Provider Data:", providerData);

      // Validate required fields (email and password only)
      if (!providerData.email) throw new Error("Email is missing");
      if (!providerData.password) throw new Error("Password is missing");
      if (providerData.password.length < 6) throw new Error("Password must be at least 6 characters");

      // Step 1: Create Firebase Auth user
      console.log("Creating user with email:", providerData.email);
      const userCredential = await createUserWithEmailAndPassword(auth, providerData.email, providerData.password);
      const user = userCredential.user;
      console.log("User created successfully, UID:", user.uid);

      // Step 2: Optionally upload file to Firebase Storage
      let documentUrl: string | null = null;
      if (providerData.fileUri && providerData.fileName) {
        console.log("Fetching file from URI:", providerData.fileUri);
        const response = await fetch(providerData.fileUri);
        if (!response.ok) {
          console.warn(`Failed to fetch file: ${response.statusText}, proceeding without document`);
        } else {
          const blob = await response.blob();
          console.log("File fetched, uploading to Storage...");
          const fileRef = ref(storage, `provider_documents/${user.uid}/${providerData.fileName}`);
          await uploadBytes(fileRef, blob);
          documentUrl = await getDownloadURL(fileRef);
          console.log("File uploaded successfully, URL:", documentUrl);
        }
      } else {
        console.log("No file provided, skipping upload...");
      }

      // Step 3: Save user data to Firestore
      console.log("Saving user data to Firestore...");
      const userData = {
        role: 'healthcare_provider',
        firstName: providerData.firstName,
        lastName: providerData.lastName,
        nicNumber: providerData.nicNumber,
        email: providerData.email,
        phoneNumber: providerData.phoneNumber,
        medicalLicenseNumber: providerData.medicalLicenseNumber,
        affiliatedHospital: providerData.affiliatedHospital,
        workplaceAddress: providerData.workplaceAddress,
        position: providerData.position,
        documentUrl: documentUrl || null, // Store null if no document
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(firestore, 'users', user.uid), userData);
      console.log("User data saved to Firestore");
  
      console.log("Healthcare Provider registration successful");
      Alert.alert('Success', 'Account created! Please log in.');
      router.replace('/login');  // This should work after everything is done
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Registration error:', errorMessage);
      Alert.alert('Registration Failed', errorMessage);
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

      {/* Animated Title */}
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

      <TouchableOpacity style={styles.button} onPress={handleCompleteProfile}>
        <Text style={styles.buttonText}>Complete Profile</Text>
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
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
