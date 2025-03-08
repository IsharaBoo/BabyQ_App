// app/ParentRegistration2.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { RadioButton } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';

interface DOB {
  month: string;
  day: string;
  year: string;
}

export default function ParentRegistration2() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false); // Added for UX

  // Parent data from params
  const parentData = {
    fullName: params.fullName as string,
    nicNumber: params.nicNumber as string,
    dob: JSON.parse(params.dob as string) as DOB,
    address: params.address as string,
    phoneNumber: params.phoneNumber as string,
    email: params.email as string,
  };

  // Child data
  const [childName, setChildName] = useState<string>('');
  const [birthCertNumber, setBirthCertNumber] = useState<string>('');
  const [childDob, setChildDob] = useState<DOB>({ month: '', day: '', year: '' });
  const [gender, setGender] = useState<string>('');
  const [bloodType, setBloodType] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [allergies, setAllergies] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUp = async () => {
    setIsLoading(true); // Start loading

    // Validation
    if (!childName || !birthCertNumber || !childDob.day || !childDob.month || !childDob.year || !gender || !password) {
      Alert.alert('Error', 'Please fill in all required fields (child name, birth certificate, DOB, gender, and password)');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Validate child DOB
    const childDobDate = new Date(`${childDob.year}-${childDob.month}-${childDob.day}`);
    if (isNaN(childDobDate.getTime()) || childDobDate > new Date()) {
      Alert.alert('Error', 'Please enter a valid child date of birth');
      setIsLoading(false);
      return;
    }

    try {
      // Register user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, parentData.email, password);
      const user = userCredential.user;

      // Save parent and child data to Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        role: 'parent',
        fullName: parentData.fullName,
        nicNumber: parentData.nicNumber,
        dob: parentData.dob,
        address: parentData.address,
        phoneNumber: parentData.phoneNumber,
        email: parentData.email,
        children: [
          {
            childName,
      birthCertNumber,
      dob: childDob,
      gender,
      bloodType: bloodType || null, // Set to null if undefined
      weight: weight || null, // Set to null if undefined
      height: height || null, // Set to null if undefined
      allergies: allergies || null, // Set to null if undefined
      additionalInfo: additionalInfo || null
          },
        ],
        createdAt: new Date().toISOString(),
      });

      console.log('Parent registration successful');
      Alert.alert('Success', 'Parent account created! Please log in.');
      router.replace('/home'); // Or '/home' if you want direct navigation
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Registration error:', errorMessage);
      Alert.alert(
        'Registration Failed',
        errorMessage.includes('auth/email-already-in-use') ? 'Email already in use' : errorMessage
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Details of your Child</Text>

      <TextInput
        placeholder="Full name of the child"
        value={childName}
        onChangeText={setChildName}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Child’s birth certificate registration no"
        value={birthCertNumber}
        onChangeText={setBirthCertNumber}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <View style={styles.dobContainer}>
        <TextInput
          placeholder="MM"
          value={childDob.month}
          onChangeText={(text) => setChildDob({ ...childDob, month: text })}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={2}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="DD"
          value={childDob.day}
          onChangeText={(text) => setChildDob({ ...childDob, day: text })}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={2}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="YYYY"
          value={childDob.year}
          onChangeText={(text) => setChildDob({ ...childDob, year: text })}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={4}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity onPress={() => setGender('Male')} style={styles.radioItem}>
          <RadioButton value="Male" status={gender === 'Male' ? 'checked' : 'unchecked'} />
          <Text style={styles.radioText}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setGender('Female')} style={styles.radioItem}>
          <RadioButton value="Female" status={gender === 'Female' ? 'checked' : 'unchecked'} />
          <Text style={styles.radioText}>Female</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Blood type"
        value={bloodType}
        onChangeText={setBloodType}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="default"
      />

      <TextInput
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Allergies"
        value={allergies}
        onChangeText={setAllergies}
        style={styles.input}
        placeholderTextColor="#666"
      />

      <TextInput
        placeholder="Add any additional information"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
        style={styles.input}
        placeholderTextColor="#666"
        multiline
      />

      {/* Password Field */}
      <TextInput
        placeholder="Password (min 6 characters)"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#666"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? 'Signing Up...' : 'Sign up'}</Text>
      </TouchableOpacity>

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
    textAlign: 'left',
    marginBottom: 20,
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
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  radioText: {
    fontSize: 16,
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