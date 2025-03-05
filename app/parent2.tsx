import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { RadioButton } from 'react-native-paper';

export default function ParentRegistration2() {
  const router = useRouter();
  const [childName, setChildName] = useState('');
  const [birthCertNumber, setBirthCertNumber] = useState('');
  const [dob, setDob] = useState({ month: '', day: '', year: '' });
  const [gender, setGender] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSignUp = () => {
    // Add validation and sign-up logic here
    router.replace('/home'); // Redirect to Home Page after sign-up
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Details of your Child</Text>

      {/* Child's Full Name */}
      <TextInput
        placeholder="Full name of the child"
        value={childName}
        onChangeText={setChildName}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* Child's Birth Certificate Number */}
      <TextInput
        placeholder="Child’s birth certificate registration no"
        value={birthCertNumber}
        onChangeText={setBirthCertNumber}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* Child's Date of Birth */}
      <View style={styles.dobContainer}>
        <TextInput
          placeholder="MM"
          value={dob.month}
          onChangeText={(text) => setDob({ ...dob, month: text })}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={2}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="DD"
          value={dob.day}
          onChangeText={(text) => setDob({ ...dob, day: text })}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={2}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="YYYY"
          value={dob.year}
          onChangeText={(text) => setDob({ ...dob, year: text })}
          style={styles.dobInput}
          placeholderTextColor="#666"
          maxLength={4}
          keyboardType="numeric"
        />
      </View>

      {/* Gender Selection */}
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

      {/* Blood Type */}
      <TextInput
        placeholder="Blood type"
        value={bloodType}
        onChangeText={setBloodType}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="default"
      />

      {/* Weight */}
      <TextInput
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="numeric"
      />

      {/* Height */}
      <TextInput
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
        placeholderTextColor="#666"
        keyboardType="numeric"
      />

      {/* Allergies */}
      <TextInput
        placeholder="Allergies"
        value={allergies}
        onChangeText={setAllergies}
        style={styles.input}
        placeholderTextColor="#666"
      />

      {/* Additional Information */}
      <TextInput
        placeholder="Add any additional information"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
        style={styles.input}
        placeholderTextColor="#666"
        multiline
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      {/* Login Link */}
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