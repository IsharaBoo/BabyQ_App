import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import AddReportPage from './AddReportPage'; // Correct import

// Define the type for each report
type ReportEntry = {
  title: string;
  description: string;
  date: string;
};

const ViewReports = () => {
  const [reports, setReports] = useState<ReportEntry[]>([]);
  const [showAddPage, setShowAddPage] = useState(false);

  const handleAddReport = (newReport: ReportEntry) => {
    setReports((prevReports) => [...prevReports, newReport]);
    setShowAddPage(false); // Close the AddReportPage after submitting
  };

  const handleAddReportPage = () => {
    setShowAddPage(true); // Show the AddReportPage
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Reports</Text>

      {/* Display existing reports */}
      <View style={styles.historyContainer}>
        {reports.length === 0 ? (
          <Text>No reports available.</Text> // Display message if no records exist
        ) : (
          reports.map((report, index) => (
            <View key={index} style={styles.record}>
              <Text style={styles.reportTitle}>{report.title}</Text>
              <Text style={styles.reportDescription}>{report.description}</Text>
              <Text style={styles.date}>Date: {report.date}</Text>
            </View>
          ))
        )}
      </View>

      {/* Floating Action Button for adding reports */}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddReportPage}
        color="white"
      />
      
      {/* Show AddReportPage if showAddPage is true */}
      {showAddPage && <AddReportPage onSubmit={handleAddReport} />}
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
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reportDescription: {
    fontSize: 16,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'darkblue',
  },
});

export default ViewReports;
