import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

// Define the type for the props
type AddAllergyHistoryPageProps = {
  onSubmit: (data: { allergyName: string; reaction: string; lastExposureDate: string }) => void;
};

const AddAllergyHistoryPage = ({ onSubmit }: AddAllergyHistoryPageProps) => {
  const [allergyName, setAllergyName] = useState('');
  const [reaction, setReaction] = useState('');
  const [lastExposureDate, setLastExposureDate] = useState('');

  const handleSubmit = () => {
    if (!allergyName || !reaction || !lastExposureDate) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Call the onSubmit function passed as a prop
    onSubmit({ allergyName, reaction, lastExposureDate });
    Alert.alert('Success', 'Allergy history added!');
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



