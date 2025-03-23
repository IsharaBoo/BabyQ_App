import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Dynamic backend URL (same as LoginPage)
const getBackendUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:8082';
  } else if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8082'; // Emulator
  } else {
    return 'http://192.168.8.119:8082'; // iOS and physical devices
  }
};

const backendUrl = getBackendUrl();

const MyAppointmentsScreen = () => {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState(null);

  // Fetch user data and appointments on mount
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (!userDataString) {
          Alert.alert('Error', 'Please log in to view appointments');
          router.replace('/login');
          return;
        }

        const userData = JSON.parse(userDataString);
        setUserRole(userData.role);
        setUserId(userData.id);

        let endpoint;
        if (userData.role === 'Parent/Guardian') {
          endpoint = `${backendUrl}/api/appointments/parent/${userData.id}`;
        } else if (userData.role === 'Doctor') {
          endpoint = `${backendUrl}/api/appointments/doctor/${userData.id}`;
        } else {
          Alert.alert('Error', 'Invalid user role');
          router.replace('/login');
          return;
        }

        const response = await axios.get(endpoint, { timeout: 5000 });
        setAppointments(response.data || []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Failed to fetch appointments:', error.response?.data || error.message);
        } else {
          console.error('Failed to fetch appointments:', error);
        }
        Alert.alert('Error', 'Could not load appointments');
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [router]);

  const renderAppointment = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.appointmentText}>
        {userRole === 'Parent/Guardian' ? `Doctor: ${item.doctorName}` : `Parent: ${item.parentName}`}
      </Text>
      <Text style={styles.appointmentText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.appointmentText}>Time: {item.time}</Text>
      <Text style={styles.appointmentText}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Appointments</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2D4BC2" style={{ marginVertical: 20 }} />
      ) : appointments.length === 0 ? (
        <Text style={styles.noAppointments}>No upcoming appointments.</Text>
      ) : (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          style={styles.appointmentList}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>

      {/* Bottom Navbar */}
      <BlurView intensity={20} style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.replace('./home')}>
            <FontAwesome name="home" size={22} color="#2D4BC2" />
            <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => Alert.alert('Info', 'Community page not available')}>
            <FontAwesome name="users" size={22} color="#888" />
            <Text style={styles.navText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./CHDR')}>
            <FontAwesome name="line-chart" size={22} color="#888" />
            <Text style={styles.navText}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./Channel')}>
            <FontAwesome name="file-text" size={22} color="#888" />
            <Text style={styles.navText}>Medical History</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#2D4BC2',
  },
  noAppointments: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginVertical: 20,
  },
  appointmentList: {
    flexGrow: 0,
    marginHorizontal: 20,
  },
  appointmentCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  appointmentText: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 80, // Space for navbar
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888',
  },
  activeNavText: {
    color: '#2D4BC2',
    fontWeight: 'bold',
  },
});

export default MyAppointmentsScreen;