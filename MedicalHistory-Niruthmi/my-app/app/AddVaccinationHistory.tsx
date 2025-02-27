import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

// Define the type for the props
type AddVaccinationHistoryPageProps = {
  onSubmit: (data: { vaccineName: string; date: string; notes: string }) => void;
};

const AddVaccinationHistoryPage = ({ onSubmit }: AddVaccinationHistoryPageProps) => {
  const [vaccineName, setVaccineName] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!vaccineName || !date || !notes) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Call the onSubmit function passed as a prop
    onSubmit({ vaccineName, date, notes });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Vaccination History</Text>

      <TextInput
        style={styles.input}
        placeholder="Vaccine Name"
        value={vaccineName}
        onChangeText={setVaccineName}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
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

export default AddVaccinationHistoryPage;


