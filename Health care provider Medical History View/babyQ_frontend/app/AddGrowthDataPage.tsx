
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';

type AddGrowthDataPageProps = {
  onSubmit: (data: { weight: string; height: string; age: string; date: string; bmi: string }) => void;
};

const AddGrowthDataPage = ({ onSubmit }: AddGrowthDataPageProps) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');

  const calculateBMI = (weight: string, height: string) => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // Convert height from cm to meters
    if (!weightNum || !heightNum) return null;
    return (weightNum / (heightNum * heightNum)).toFixed(2); // BMI formula
  };

  const handleSubmit = async () => {
    if (!weight || !height || !age || !date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const bmi = calculateBMI(weight, height);
    if (!bmi) {
      Alert.alert('Error', 'Invalid height or weight values');
      return;
    }

    const newGrowthData = {
      weight,
      height,
      age,
      date,
      bmi,
    };

    try {
      const response = await axios.post('http://localhost:8082/api/growth-data', newGrowthData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Growth data added successfully!');
        onSubmit(newGrowthData); // Update parent component's state with new data
      } else {
        Alert.alert('Error', 'Failed to add growth data');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Could not connect to the backend. Check server logs.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Growth Data</Text>

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Age (years)"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
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

export default AddGrowthDataPage;
