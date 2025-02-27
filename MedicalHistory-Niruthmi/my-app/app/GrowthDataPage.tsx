import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import AddGrowthDataPage from './AddGrowthDataPage';

// Define the type for each entry in growth data
type GrowthDataEntry = {
  weight: string;
  height: string;
  date: string;
};

const GrowthDataPage = () => {
  const [growthData, setGrowthData] = useState<GrowthDataEntry[]>([]);
  const [showAddPage, setShowAddPage] = useState(false);

  const handleAddGrowthData = (newData: GrowthDataEntry) => {
    setGrowthData((prevData) => [...prevData, newData]);
    setShowAddPage(false); // Close the AddGrowthDataPage after submitting
  };

  const handleAddGrowthDataPage = () => {
    setShowAddPage(true); // Show the AddGrowthDataPage
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Growth Data</Text>

      {/* Display existing growth data */}
      <View style={styles.dataContainer}>
        {growthData.length === 0 ? (
          <Text>No growth data available.</Text> // Display message if no records exist
        ) : (
          growthData.map((data, index) => (
            <View key={index} style={styles.record}>
              <Text style={styles.dataTitle}>Date: {data.date}</Text>
              <Text style={styles.data}>Weight: {data.weight} kg</Text>
              <Text style={styles.data}>Height: {data.height} cm</Text>
            </View>
          ))
        )}
      </View>

      {/* Floating Action Button for adding growth data */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddGrowthDataPage}
      />

      {/* Show AddGrowthDataPage if showAddPage is true */}
      {showAddPage && <AddGrowthDataPage onSubmit={handleAddGrowthData} />}
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
  dataContainer: {
    marginBottom: 20,
  },
  record: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  data: {
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

export default GrowthDataPage;



















