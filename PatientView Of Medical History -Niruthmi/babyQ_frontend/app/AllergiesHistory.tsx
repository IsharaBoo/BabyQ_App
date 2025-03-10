
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import axios from 'axios';
// import AddAllergyHistoryPage from './AddAllergyHistoryPage';

type AllergyHistoryEntry = {
  allergyName: string;
  reaction: string;
  lastExposureDate: string;
};

const AllergiesHistory = () => {
  const [allergyHistory, setAllergyHistory] = useState<AllergyHistoryEntry[]>([]);
  const [showAddPage, setShowAddPage] = useState(false);

  // Fetch allergy history from the backend
  useEffect(() => {
    const fetchAllergyHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/allergy-history');
        setAllergyHistory(response.data); // Assuming response data is an array of allergy history entries
      } catch (error) {
        console.error('Error fetching allergy history:', error);
        Alert.alert('Error', 'Failed to fetch allergy history. Please try again later.');
      }
    };

    fetchAllergyHistory();
  }, []);

  const handleAddAllergyHistory = (newHistory: AllergyHistoryEntry) => {
    setAllergyHistory((prevHistory) => [...prevHistory, newHistory]);
    setShowAddPage(false); // Close the AddAllergyHistoryPage after submitting
  };

  const handleAddAllergyPage = () => {
    setShowAddPage(true); // Show the AddAllergyHistoryPage
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Allergy History</Text>

      {/* Display existing allergy history */}
      <View style={styles.historyContainer}>
        {allergyHistory.length === 0 ? (
          <Text>No allergy history available.</Text>
        ) : (
          allergyHistory.map((history, index) => (
            <View key={index} style={styles.record}>
              <Text style={styles.allergyName}>{history.allergyName}</Text>
              <Text style={styles.reaction}>Reaction: {history.reaction}</Text>
              <Text style={styles.date}>Last Exposure: {history.lastExposureDate}</Text>
            </View>
          ))
        )}
      </View>

      {/* Floating Action Button for adding allergy history */}
      {/* <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddAllergyPage}
      /> */}
      
      {/* Show AddAllergyHistoryPage if showAddPage is true */}
      {/* {showAddPage && <AddAllergyHistoryPage onSubmit={handleAddAllergyHistory} />} */}
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
  allergyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reaction: {
    fontSize: 16,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  fab: {
    position: 'absolute',
    bottom: 20,  // Adjusted to a visible spot
    right: 20,   // Positioned to the right
    backgroundColor: '#007AFF',
  },
});

export default AllergiesHistory;
