import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    fullName: params.fullName as string || '',
    nicNumber: params.nicNumber as string || '',
    dateOfBirth: params.dateOfBirth as string || '', // Must be YYYY-MM-DD
    address: params.address as string || '',
    phoneNumber: params.phoneNumber as string || '',
    email: params.email as string || '',
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

  const getBackendUrl = () => {
    if (Platform.OS === 'web') {
      return 'http://localhost:8082';
      //return  'http://10.31.23.48:8082';
    } else if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8082'; // Emulator
    } else {
      return 'http://192.168.8.119:8082'; // iOS and physical devices
      //return 'http://10.31.23.48:8082';
    }
  };
  const backendUrl = getBackendUrl();

  const handleSignUp = async () => {
    setIsLoading(true);

    if (!childName || !birthCertNumber || !childDob.day || !childDob.month || !childDob.year || !gender || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    const childDobString = `${childDob.year}-${childDob.month.padStart(2, '0')}-${childDob.day.padStart(2, '0')}`;
    const childDobDate = new Date(childDobString);
    const isValidDate =
      !isNaN(childDobDate.getTime()) &&
      parseInt(childDob.month) >= 1 && parseInt(childDob.month) <= 12 &&
      parseInt(childDob.day) >= 1 && parseInt(childDob.day) <= new Date(parseInt(childDob.year), parseInt(childDob.month), 0).getDate() &&
      childDobDate <= new Date();
    if (!isValidDate) {
      Alert.alert('Error', 'Please enter a valid child date of birth');
      setIsLoading(false);
      return;
    }

    if (weight && isNaN(parseFloat(weight))) {
      Alert.alert('Error', 'Weight must be a valid number');
      setIsLoading(false);
      return;
    }
    if (height && isNaN(parseFloat(height))) {
      Alert.alert('Error', 'Height must be a valid number');
      setIsLoading(false);
      return;
    }

    try {
      const parentPayload = {
        fullName: parentData.fullName,
        nicNumber: parentData.nicNumber,
        dateOfBirth: parentData.dateOfBirth,
        address: parentData.address,
        phoneNumber: parentData.phoneNumber,
        email: parentData.email,
        password,
      };
      console.log('Registering parent:', parentPayload);
      const parentResponse = await axios.post(`${backendUrl}/api/parents/register`, parentPayload, { timeout: 15000 });
      const parentId = parentResponse.data.id;
      if (!parentId) {
        throw new Error('Parent ID not returned from server');
      }
      console.log('Parent registered with ID:', parentId);

      const childPayload = {
        name: childName,
        birthCNo: birthCertNumber,
        dob: childDobString,
        gender,
        bloodGroup: bloodType || null,
        allergies: allergies || null,
        age: Math.floor((new Date().getTime() - childDobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25)),
        weight: weight ? parseFloat(weight) : null,
        height: height ? parseFloat(height) : null,
        additionalDetails: additionalInfo || null,
        parentId,
      };
      console.log('Registering child:', childPayload);
      await axios.post(`${backendUrl}/api/children`, childPayload, { timeout: 15000 });
      console.log('Child registered successfully');

      const userData = {
        name: parentData.fullName,
        email: parentData.email,
        role: 'Parent/Guardian',
        registrationDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
        nicNumber: parentData.nicNumber,
        dob: {
          month: parentData.dateOfBirth.slice(5, 7),
          day: parentData.dateOfBirth.slice(8, 10),
          year: parentData.dateOfBirth.slice(0, 4),
        },
        address: parentData.address,
        phoneNumber: parentData.phoneNumber,
        childName,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log('User data saved to AsyncStorage:', userData);

      console.log('Showing success alert');
    Alert.alert('Success', 'Parent and child registered successfully!');
    console.log('Navigating to /home');
    router.push('/home');

    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      let errorMessage = 'An error occurred during registration';
      if (error.response) {
        errorMessage = error.response.data || 'Server error';
        if (error.response.status === 400) errorMessage = 'Invalid data provided';
        if (error.response.status === 404) errorMessage = 'Parent not found';
        if (error.response.status === 500) errorMessage = 'Server error, please try again later';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Check your network or server.';
      } else if (error.request) {
        errorMessage = 'Network error: Unable to reach the server';
      }
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
    flexGrow: 1,
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
    marginTop: 20,
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