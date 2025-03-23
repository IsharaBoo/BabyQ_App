import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
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

const EditProfileScreen = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    childName: '',
    age: '',
    dob: '',
    gender: '',
    address: '',
    id: null, // To store parent ID for backend updates
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
              name: userData.name || '',
              phone: userData.phone || '', // Add to parentUserData if available
              email: userData.email || '',
              childName: userData.childName || 'No child registered',
              age: userData.age || '', // Add to parentUserData if available
              dob: userData.dob || '', // Add to parentUserData if available
              gender: userData.gender || '', // Add to parentUserData if available
              address: userData.address || '', // Add to parentUserData if available
              id: userData.id || null,
            });
          } else {
            Alert.alert('Error', 'Not logged in as a parent');
            router.replace('/login');
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

  const handleChange = (field: keyof typeof profile, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleUpdate = async () => {
    try {
      // Update AsyncStorage
      const updatedUserData = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: 'Parent/Guardian',
        registrationDate: profile.registrationDate || new Date().toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        childName: profile.childName,
        phone: profile.phone,
        age: profile.age,
        dob: profile.dob,
        gender: profile.gender,
        address: profile.address,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      console.log('Profile updated in AsyncStorage:', updatedUserData);

      // Optional: Sync with backend (uncomment and adjust endpoint as needed)
      /*
      if (profile.id) {
        await axios.patch(`${backendUrl}/api/parents/${profile.id}`, {
          fullName: profile.name,
          email: profile.email,
          phoneNumber: profile.phone,
          childName: profile.childName,
          childAge: profile.age,
          childDob: profile.dob,
          childGender: profile.gender,
          address: profile.address,
        });
        console.log('Profile synced with backend');
      }
      */

      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Could not update profile');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Your Profile</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={profile.name}
            onChangeText={(text) => handleChange('name', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={profile.phone}
            onChangeText={(text) => handleChange('phone', text)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profile.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name of the Child</Text>
          <TextInput
            style={styles.input}
            value={profile.childName}
            onChangeText={(text) => handleChange('childName', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={profile.age}
            keyboardType="numeric"
            onChangeText={(text) => handleChange('age', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={profile.dob}
            onChangeText={(text) => handleChange('dob', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={styles.input}
            value={profile.gender}
            onChangeText={(text) => handleChange('gender', text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={profile.address}
            onChangeText={(text) => handleChange('address', text)}
          />
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>

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
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 100,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2D4BC2',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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

export default EditProfileScreen;