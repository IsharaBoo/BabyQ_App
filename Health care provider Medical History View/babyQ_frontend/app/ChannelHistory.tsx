
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import axios from 'axios';
import AddChannelingHistoryPage from './AddChannelingHistoryPage';

// Define the type for each entry in channeling history
type ChannelHistoryEntry = {
  doctorName: string;
  specialty: string;
  appointmentDate: string;
  doctorNotes: string;
  medicalConditions: string;
  symptoms: string;
};

const ChannelHistory = () => {
  const [channelingHistory, setChannelingHistory] = useState<ChannelHistoryEntry[]>([]);
  const [showAddPage, setShowAddPage] = useState(false);

  // Fetch channeling history from the backend
  useEffect(() => {
    const fetchChannelingHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/channeling-history');
        setChannelingHistory(response.data); // Assuming response data is an array of channeling history entries
      } catch (error) {
        console.error('Error fetching channeling history:', error);
        Alert.alert('Error', 'Failed to fetch channeling history. Please try again later.');
      }
    };

    fetchChannelingHistory();
  }, []);

  // Function to handle adding new channeling history
  const handleAddChannelingHistory = async (newHistory: ChannelHistoryEntry) => {
    try {
      // POST request to the backend to add new history
      const response = await axios.post('http://localhost:8082/api/channeling-history', newHistory);
      
      // On success, update the state with the new history entry
      setChannelingHistory((prevHistory) => [...prevHistory, response.data]);
      setShowAddPage(false); // Close the AddChannelingHistoryPage after submitting
    } catch (error) {
      console.error('Error adding channeling history:', error);
      Alert.alert('Error', 'Failed to add channeling history. Please try again later.');
    }
  };

  // Function to show the AddChannelingHistoryPage
  const handleAddChannelingPage = () => {
    setShowAddPage(true); // Show the AddChannelingHistoryPage
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Channel History</Text>

      {/* Display existing channeling history */}
      <View style={styles.historyContainer}>
        {channelingHistory.length === 0 ? (
          <Text>No channeling history available.</Text>
        ) : (
          channelingHistory.map((history, index) => (
            <View key={index} style={styles.record}>
              <Text style={styles.doctorName}>{history.doctorName}</Text>
              <Text style={styles.specialty}>{history.specialty}</Text>
              <Text style={styles.date}>Date: {history.appointmentDate}</Text>
              <Text style={styles.notes}>Doctor's Notes: {history.doctorNotes}</Text>
              <Text style={styles.conditions}>Medical Conditions: {history.medicalConditions}</Text>
              <Text style={styles.symptoms}>Symptoms: {history.symptoms}</Text>
            </View>
          ))
        )}
      </View>

      {/* Floating Action Button for adding channeling history */}
       <FAB style={styles.fab} icon="plus" onPress={handleAddChannelingPage} /> 

      {/* Show AddChannelingHistoryPage if showAddPage is true */}
      {showAddPage && <AddChannelingHistoryPage onSubmit={handleAddChannelingHistory} />} 
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
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  notes: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  conditions: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  symptoms: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
  },
});

export default ChannelHistory;
