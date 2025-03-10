
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import { FAB } from 'react-native-paper';
import axios from 'axios';
// import AddVaccinationHistoryPage from './AddVaccinationHistory';

// Define the type for each entry in vaccination history
type VaccinationHistoryEntry = {
  vaccineName: string;
  date: string;
  notes: string;
};

const VaccinationHistory = () => {
  // State to hold vaccination records
  const [vaccinationHistory, setVaccinationHistory] = useState<VaccinationHistoryEntry[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<VaccinationHistoryEntry[]>([]); // State to hold filtered data
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [showAddPage, setShowAddPage] = useState(false);

  // Fetch vaccination history from the backend when the component mounts
  useEffect(() => {
    const fetchVaccinationHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/vaccination-history');
        if (response.status === 200) {
          setVaccinationHistory(response.data); // Update state with the fetched data
          setFilteredHistory(response.data); // Initially show all data
        }
      } catch (error) {
        console.error('Error fetching vaccination history:', error);
      }
    };

    fetchVaccinationHistory();
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Handle search query change
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update the search query

    // Filter history based on the vaccine name and update the filteredHistory state
    const filtered = vaccinationHistory.filter((history) =>
      history.vaccineName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredHistory(filtered);
  };

  const handleAddVaccinationHistory = (newHistory: VaccinationHistoryEntry) => {
    setVaccinationHistory((prevHistory) => [...prevHistory, newHistory]);
    setFilteredHistory((prevHistory) => [...prevHistory, newHistory]); // Add to filtered history as well
    setShowAddPage(false); // Close the AddVaccinationHistoryPage after submitting
  };

  const handleAddVaccinationPage = () => {
    setShowAddPage(true); // Show the AddVaccinationHistoryPage
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vaccination History</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by vaccine name"
        value={searchQuery}
        onChangeText={handleSearch} // Handle the search query change
      />

      {/* Display filtered vaccination history */}
      <View style={styles.historyContainer}>
        {filteredHistory.length === 0 ? (
          <Text>No matching vaccination history found.</Text> // Display message if no matching records exist
        ) : (
          filteredHistory.map((history, index) => (
            <View key={index} style={styles.record}>
              <Text style={styles.vaccineName}>{history.vaccineName}</Text>
              <Text style={styles.date}>Date: {history.date}</Text>
              <Text style={styles.notes}>Notes: {history.notes}</Text>
            </View>
          ))
        )}
      </View>

      {/* Floating Action Button for adding vaccination history */}
      <FAB style={styles.fab} icon="plus" onPress={handleAddVaccinationPage} />

      {/* Show AddVaccinationHistoryPage if showAddPage is true */}
{/*       
      {showAddPage && <AddVaccinationHistoryPage onSubmit={handleAddVaccinationHistory} />} */}
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
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
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
    backgroundColor: '#007AFF',
  },
});

export default VaccinationHistory;
