import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import AddVaccinationHistoryPage from './AddVaccinationHistory';

// Define the type for each entry in vaccination history
type VaccinationHistoryEntry = {
  vaccineName: string;
  date: string;
  notes: string;
};

const VaccinationHistory = () => {
  // State to hold vaccination records
  const [vaccinationHistory, setVaccinationHistory] = useState<VaccinationHistoryEntry[]>([]);
  const [showAddPage, setShowAddPage] = useState(false);

  const handleAddVaccinationHistory = (newHistory: VaccinationHistoryEntry) => {
    setVaccinationHistory((prevHistory) => [...prevHistory, newHistory]);
    setShowAddPage(false); // Close the AddVaccinationHistoryPage after submitting
  };

  const handleAddVaccinationPage = () => {
    setShowAddPage(true); // Show the AddVaccinationHistoryPage
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vaccination History</Text>

      {/* Display existing vaccination history */}
      <View style={styles.historyContainer}>
        {vaccinationHistory.length === 0 ? (
          <Text>No vaccination history available.</Text> // Display message if no records exist
        ) : (
          vaccinationHistory.map((history, index) => (
            <View key={index} style={styles.record}>
              <Text style={styles.vaccineName}>{history.vaccineName}</Text>
              <Text style={styles.date}>Date: {history.date}</Text>
              <Text style={styles.notes}>Notes: {history.notes}</Text>
            </View>
          ))
        )}
      </View>

      {/* Floating Action Button for adding vaccination history */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddVaccinationPage}
        color="white"
      />

      {/* Show AddVaccinationHistoryPage if showAddPage is true */}
      {showAddPage && <AddVaccinationHistoryPage onSubmit={handleAddVaccinationHistory} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  historyContainer: {
    marginBottom: 20,
  },
  record: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  vaccineName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  notes: {
    fontSize: 14,
    color: '#555',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'darkblue',
  },
});

export default VaccinationHistory;
