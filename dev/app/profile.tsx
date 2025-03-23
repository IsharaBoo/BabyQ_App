import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ParentProfileScreen = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: 'Loading...',
    email: 'Loading...',
    childName: 'No child registered',
    registrationDate: 'Unknown',
  });

  // Load parent data from AsyncStorage on mount
  useEffect(() => {
    const loadParentData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData.role === 'Parent/Guardian') {
            setProfile({
              name: userData.name || 'Unknown Name',
              email: userData.email || 'Unknown Email',
              childName: userData.childName || 'No child registered',
              registrationDate: userData.registrationDate || 'Unknown',
            });
          } else {
            Alert.alert('Error', 'Not logged in as a parent');
            router.replace('/login'); // Redirect if not a parent
          }
        } else {
          Alert.alert('Error', 'No user data found. Please log in.');
          router.replace('/login');
        }
      } catch (error) {
        console.error('Failed to load parent data:', error);
        Alert.alert('Error', 'Could not load profile data');
      }
    };

    loadParentData();
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Header with Avatar and Edit Button */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{profile.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <Text style={styles.childInfo}>Child: {profile.childName}</Text>
        <Text style={styles.regDate}>Registered: {profile.registrationDate}</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => router.push('./EditProfileScreen')}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('./MyAppointmentsScreen')}>
          <Ionicons name='calendar-outline' size={24} color='#000' />
          <Text style={styles.menuText}>My Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('./UpcomingTestResultsScreen')}>
          <Ionicons name='flask-outline' size={24} color='#000' />
          <Text style={styles.menuText}>Test Results</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('./UpcomingVaccinationsScreen')}>
          <Ionicons name='medkit-outline' size={24} color='#000' />
          <Text style={styles.menuText}>Allergies, Vaccinations</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navbar */}
      <BlurView intensity={20} style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.replace('./home')}>
            <FontAwesome name='home' size={22} color='#2D4BC2' />
            <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => Alert.alert('Info', 'Community page not available')}>
            <FontAwesome name='users' size={22} color='#888' />
            <Text style={styles.navText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./CHDR')}>
            <FontAwesome name='line-chart' size={22} color='#888' />
            <Text style={styles.navText}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./Channel')}>
            <FontAwesome name='file-text' size={22} color='#888' />
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
  header: {
    backgroundColor: '#007BFF',
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#A0C4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  childInfo: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  regDate: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
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

export default ParentProfileScreen;