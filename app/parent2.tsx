import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, setLogLevel } from 'firebase/firestore';
import { auth, firestore } from './firebase';
setLogLevel('debug'); // Add this at the top of your file

interface DOB {
  month: string;
  day: string;
  year: string;
}

export default function ParentRegistration2() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const parentData = {
    fullName: params.fullName as string,
    nicNumber: params.nicNumber as string,
    dob: JSON.parse(params.dob as string) as DOB,
    address: params.address as string,
    phoneNumber: params.phoneNumber as string,
    email: params.email as string,
  };

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
    setIsLoading(true);

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

    const childDobDate = new Date(`${childDob.year}-${childDob.month}-${childDob.day}`);
    if (isNaN(childDobDate.getTime()) || childDobDate > new Date()) {
      Alert.alert('Error', 'Please enter a valid child date of birth');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, parentData.email, password);
      const user = userCredential.user;

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
            bloodType: bloodType || null,
            weight: weight || null,
            height: height || null,
            allergies: allergies || null,
            additionalInfo: additionalInfo || null,
          },
        ],
        createdAt: new Date().toISOString(),
      });

      Alert.alert('Success', 'Parent account created successfully!');
      router.push('/home'); // Auto-navigate to home since user is logged in
    } catch (error: any) {
      let errorMessage = 'An unknown error occurred';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      
      } else {
        errorMessage = error.message;
      }
      console.error('Registration error:', error);
      Alert.alert('Registration Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="arrow-back" size={30} color="#2D4BC2" />
      </TouchableOpacity>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allow content to grow and take up available space
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
    marginBottom: 20,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2D4BC2',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  loginText: {
    color: '#2D4BC2',
    fontSize: 16,
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
});