
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Dimensions } from 'react-native';
import { FAB } from 'react-native-paper';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
// import AddGrowthDataPage from './AddGrowthDataPage';

type GrowthDataEntry = {
  id: number;
  weight: string;
  height: string;
  age: string;
  date: string;
  bmi: string;
};

const screenWidth = Dimensions.get('window').width;

const GrowthDataPage = () => {
  const [growthData, setGrowthData] = useState<GrowthDataEntry[]>([]);
  const [showAddPage, setShowAddPage] = useState(false);

  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/growth-data');
        setGrowthData(response.data);
      } catch (error) {
        console.error('Error fetching growth data:', error);
        Alert.alert('Error', 'Failed to fetch growth data. Check the backend logs.');
      }
    };

    fetchGrowthData();
  }, []);

  const handleAddGrowthData = async (newData: Omit<GrowthDataEntry, 'id'>) => {
    try {
      const response = await axios.post('http://localhost:8082/api/growth-data', newData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200 || response.status === 201) {
        const predictedBmi = await axios.post('http://localhost:8082/api/predict-bmi', {
          age: newData.age,
          weight: newData.weight,
          height: newData.height,
        });

        Alert.alert('Success', `Growth data added successfully! Predicted BMI: ${predictedBmi.data.bmi}`);
        setGrowthData((prevData) => [...prevData, { ...response.data, bmi: predictedBmi.data.bmi }]);
        setShowAddPage(false);
      } else {
        Alert.alert('Error', 'Failed to add growth data');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Could not connect to the backend. Check server logs.');
    }
  };

  const weightData = growthData.map((entry) => parseFloat(entry.weight));
  const heightData = growthData.map((entry) => parseFloat(entry.height));
  const bmiData = growthData.map((entry) => parseFloat(entry.bmi));
  const ageLabels = growthData.map((entry) => entry.age); // X-axis (Age)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Growth Data</Text>

      <ScrollView>
        {/* Weight & Height Line Chart */}
        <Text style={styles.chartTitle}>Weight & Height Over Time</Text>
        <LineChart
          data={{
            labels: ageLabels,
            datasets: [
              { data: weightData, color: () => 'red', strokeWidth: 2 }, // Weight
              { data: heightData, color: () => 'blue', strokeWidth: 2 }, // Height
            ],
          }}
          width={screenWidth - 20}
          height={250}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />

        {/* BMI Line Chart */}
        <Text style={styles.chartTitle}>BMI Over Age</Text>
        <LineChart
          data={{
            labels: ageLabels,
            datasets: [{ data: bmiData, color: () => 'green', strokeWidth: 2 }],
          }}
          width={screenWidth - 20}
          height={250}
          yAxisLabel=""
          yAxisSuffix=" BMI"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />

        {/* Growth Data Records */}
        <View style={styles.dataContainer}>
          {growthData.length === 0 ? (
            <Text>No growth data available.</Text>
          ) : (
            growthData.map((data) => (
              <View key={data.id} style={styles.record}>
                <Text style={styles.dataTitle}>Date: {data.date}</Text>
                <Text style={styles.data}>Weight: {data.weight} kg</Text>
                <Text style={styles.data}>Height: {data.height} cm</Text>
                <Text style={styles.data}>Age: {data.age} years</Text>
                <Text style={styles.data}>BMI: {data.bmi}</Text>
              </View>
            ))
          )}
        </View>

        {/* <FAB style={styles.fab} icon="plus" onPress={() => setShowAddPage(true)} /> */}
      {/* {showAddPage && <AddGrowthDataPage onSubmit={handleAddGrowthData} />} */}
      </ScrollView>

      {/* Floating Action Button */}
      
    </View>
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
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  chart: {
    marginBottom: 20,
    borderRadius: 10,
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







