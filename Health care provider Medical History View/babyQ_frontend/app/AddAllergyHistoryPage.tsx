

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';

type AddAllergyHistoryPageProps = {
  onSubmit: (data: { allergyName: string; reaction: string; lastExposureDate: string }) => void;
};

const AddAllergyHistoryPage = ({ onSubmit }: AddAllergyHistoryPageProps) => {
  const [allergyName, setAllergyName] = useState('');
  const [reaction, setReaction] = useState('');
  const [lastExposureDate, setLastExposureDate] = useState('');

  const handleSubmit = async () => {
    if (!allergyName || !reaction || !lastExposureDate) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newAllergy = {
      allergyName,
      reaction,
      lastExposureDate,
    };

    try {
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:8082/api/allergy-history', newAllergy, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Allergy history added successfully!');
        onSubmit(newAllergy); // Update the local state in the parent component
      } else {
        Alert.alert('Error', 'Failed to add allergy history');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Could not connect to the backend. Check server logs.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Allergy History</Text>

      <TextInput
        style={styles.input}
        placeholder="Allergy Name"
        value={allergyName}
        onChangeText={setAllergyName}
      />

      <TextInput
        style={styles.input}
        placeholder="Reaction"
        value={reaction}
        onChangeText={setReaction}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Exposure Date (YYYY-MM-DD)"
        value={lastExposureDate}
        onChangeText={setLastExposureDate}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
  },
});

export default AddAllergyHistoryPage;