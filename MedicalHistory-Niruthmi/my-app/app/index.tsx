import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';

const MedicalHistoryPage = () => {
  const router = useRouter();

  const goToChannelingHistory = () => {
    router.push('/ChannelHistory');
  };
  const goToAllergiesHistory = () => {
    router.push('/AllergiesHistory');
  };
  const goToViewReports = () => {
    router.push('/ViewReports');
  };
  const goToVaccinationHistory = () => {
    router.push('/VaccinationHistory');
  };
  const goToGrowthDataPage = () => {
    router.push('/GrowthDataPage');
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical History</Text>
      
      

      <Button 
        mode="contained" 
        onPress={goToChannelingHistory}
        style={styles.button}
      >
       Channelings
      </Button>
      <Button 
        mode="contained" 
        onPress={goToAllergiesHistory}
        style={styles.button}
      >
       Allergies
      </Button>
      <Button 
        mode="contained" 
        onPress={goToViewReports}
        style={styles.button}
      >
        Reports
      </Button>
      <Button 
        mode="contained" 
        onPress={goToVaccinationHistory}
        style={styles.button}
      >
        Vaccination
      </Button>
      <Button 
        mode="contained" 
        onPress={goToGrowthDataPage}
        style={styles.button}
      >
        Growth Data
      </Button>
    </ScrollView>
  );
};

export default MedicalHistoryPage;

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
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 3,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor:'darkblue',
  },
});



