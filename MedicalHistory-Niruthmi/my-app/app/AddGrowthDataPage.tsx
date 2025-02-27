import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

type AddGrowthDataPageProps = {
  onSubmit: (data: { weight: string; height: string; date: string }) => void;
};

const AddGrowthDataPage = ({ onSubmit }: AddGrowthDataPageProps) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (!weight || !height || !date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Call the onSubmit function passed as a prop
    onSubmit({ weight, height, date });
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
