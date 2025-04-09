// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { router } from 'expo-router';

// const DProfile = () => {
//   const [name, setName] = useState('Enter your name');
//   const [bio, setBio] = useState('About Doctor');
//   const [email, setEmail] = useState('johndoe@example.com');
//   const [license, setLicense] = useState('Your ID number');
//   const [specialty, setSpecialty] = useState('Enter your specified field');
//   const [phone, setPhone] = useState('Enter your phone number');
//   const [workplace, setWorkplace] = useState('Hospital Name');
//   const [startYear, setStartYear] = useState('Year');
//   const [profilePic, setProfilePic] = useState('https://example.com/profile-picture.jpg');

//   useEffect(() => {
//     const loadDoctorData = async () => {
//       try {
//         const userDataString = await AsyncStorage.getItem('userData');
//         if (userDataString) {
//           const userData = JSON.parse(userDataString);
//           if (userData.role === 'Doctor') {
//             setName(userData.name || 'Enter your name');
//             setBio('About Dr. ' + (userData.name?.split(' ')[1] || 'Doctor'));
//             setEmail(userData.email || 'johndoe@example.com');
//             setLicense(userData.license || 'Your ID number');
//             setSpecialty(userData.specialty || 'Enter your specified field');
//             setPhone(userData.phone || 'Enter your phone number');
//             setWorkplace(userData.workplace || 'Hospital Name');
//             setStartYear(userData.startYear || 'Year');
//             setProfilePic(userData.documentUrl || 'https://example.com/profile-picture.jpg');
//           }
//         }
//       } catch (error) {
//         console.error('Failed to load doctor data:', error);
//         Alert.alert('Error', 'Could not load profile data');
//       }
//     };

//     loadDoctorData();
//   }, []);

//   const saveChanges = async () => {
//     const updatedData = {
//       name,
//       bio,
//       email,
//       license,
//       specialty,
//       phone,
//       workplace,
//       startYear,
//       documentUrl: profilePic,
//     };
//     try {
//       await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
//       console.log('Changes saved:', updatedData);
//       Alert.alert('Success', 'Profile updated!');
//     } catch (error) {
//       console.error('Failed to save changes:', error);
//       Alert.alert('Error', 'Could not save profile changes');
//     }
//   };

//   const selectImage = () => {
//     const options = { mediaType: 'photo' as const };
//     launchImageLibrary(options, (response) => {
//       if (response.assets && response.assets.length > 0) {
//         const uri = response.assets[0].uri || 'https://example.com/default-profile-picture.jpg';
//         setProfilePic(uri);
//         console.log('Profile picture updated:', uri);
//       }
//     });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.profileContainer}>
//         <View style={styles.profilePictureContainer}>
//           <Image style={styles.profilePicture} source={{ uri: profilePic }} />
//           <TouchableOpacity style={styles.cameraIcon} onPress={selectImage}>
//             <Icon name="camera" size={24} color="#fff" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.title}>Doctor Profile</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Full Name</Text>
//         <TextInput style={styles.input} value={name} onChangeText={setName} />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Bio</Text>
//         <TextInput style={styles.input} value={bio} onChangeText={setBio} />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Professional Email</Text>
//         <TextInput
//           style={styles.input}
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Medical License Number</Text>
//         <TextInput style={styles.input} value={license} onChangeText={setLicense} />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Specialty</Text>
//         <TextInput style={styles.input} value={specialty} onChangeText={setSpecialty} />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Phone Number</Text>
//         <TextInput
//           style={styles.input}
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//         />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Affiliated Hospital</Text>
//         <TextInput style={styles.input} value={workplace} onChangeText={setWorkplace} />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Start Year</Text>
//         <TextInput style={styles.input} value={startYear} onChangeText={setStartYear} />
//       </View>

//       <TouchableOpacity
//         style={styles.saveButton}
//         onPress={async () => {
//           await saveChanges();
//           router.push('/Channel');
//         }}
//       >
//         <Text style={styles.saveButtonText}>Save Changes</Text>
//       </TouchableOpacity>
//     </ScrollView>

    
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//     backgroundColor: '#d9e4f5',
//     padding: 20,
//     borderRadius: 10,
//   },
//   profilePictureContainer: {
//     position: 'relative',
//     marginBottom: 10,
//   },
//   profilePicture: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     borderWidth: 2,
//     borderColor: '#000',
//   },
//   cameraIcon: {
//     position: 'absolute',
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#000',
//     borderRadius: 15,
//     padding: 5,
//   },
//   title: {
//     fontSize: 25,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#2D4BC2',
//   },
//   section: {
//     backgroundColor: '#e0f7fa',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 8,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 2,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//   },
//   saveButton: {
//     backgroundColor: '#2D4BC2',
//     padding: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default DProfile;


import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';

const DProfile = () => {
  const [name, setName] = useState('Enter your name');
  const [bio, setBio] = useState('About Doctor');
  const [email, setEmail] = useState('johndoe@example.com');
  const [license, setLicense] = useState('Your ID number');
  const [specialty, setSpecialty] = useState('Enter your specified field');
  const [phone, setPhone] = useState('Enter your phone number');
  const [workplace, setWorkplace] = useState('Hospital Name');
  const [startYear, setStartYear] = useState('Year');
  const [profilePic, setProfilePic] = useState('https://example.com/profile-picture.jpg');

  useEffect(() => {
    const loadDoctorData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          if (userData.role === 'Doctor') {
            setName(userData.name || 'Enter your name');
            setBio('About Dr. ' + (userData.name?.split(' ')[1] || 'Doctor'));
            setEmail(userData.email || 'johndoe@example.com');
            setLicense(userData.license || 'Your ID number');
            setSpecialty(userData.specialty || 'Enter your specified field');
            setPhone(userData.phone || 'Enter your phone number');
            setWorkplace(userData.workplace || 'Hospital Name');
            setStartYear(userData.startYear || 'Year');
            setProfilePic(userData.documentUrl || 'https://example.com/profile-picture.jpg');
          }
        }
      } catch (error) {
        console.error('Failed to load doctor data:', error);
        Alert.alert('Error', 'Could not load profile data');
      }
    };

    loadDoctorData();
  }, []);

  const saveChanges = async () => {
    const updatedData = {
      name,
      bio,
      email,
      license,
      specialty,
      phone,
      workplace,
      startYear,
      documentUrl: profilePic,
    };
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
      console.log('Changes saved:', updatedData);
      Alert.alert('Success', 'Profile updated!');
    } catch (error) {
      console.error('Failed to save changes:', error);
      Alert.alert('Error', 'Could not save profile changes');
    }
  };

  const selectImage = () => {
    const options = { mediaType: 'photo' as const };
    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri || 'https://example.com/default-profile-picture.jpg';
        setProfilePic(uri);
        console.log('Profile picture updated:', uri);
      }
    });
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.profileContainer}>
          <View style={styles.profilePictureContainer}>
            <Image style={styles.profilePicture} source={{ uri: profilePic }} />
            <TouchableOpacity style={styles.cameraIcon} onPress={selectImage}>
              <Icon name="camera" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Doctor Profile</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bio</Text>
          <TextInput style={styles.input} value={bio} onChangeText={setBio} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Professional Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Medical License Number</Text>
          <TextInput style={styles.input} value={license} onChangeText={setLicense} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Specialty</Text>
          <TextInput style={styles.input} value={specialty} onChangeText={setSpecialty} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Affiliated Hospital</Text>
          <TextInput style={styles.input} value={workplace} onChangeText={setWorkplace} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Start Year</Text>
          <TextInput style={styles.input} value={startYear} onChangeText={setStartYear} />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={async () => {
            await saveChanges();
            router.push('/sehansa');
          }}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BlurView intensity={20} style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/home')}>
            <Icon name="home" size={22} color="#2D4BC2" />
            <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => Alert.alert('Info', 'Community page not available')}>
            <Icon name="users" size={22} color="#888" />
            <Text style={styles.navText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/CHDR')}>
            <Icon name="line-chart" size={22} color="#888" />
            <Text style={styles.navText}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/MedicalHistory')}>
            <Icon name="file-text" size={22} color="#888" />
            <Text style={styles.navText}>History</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#d9e4f5',
    padding: 20,
    borderRadius: 10,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#000',
  },
  cameraIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D4BC2',
  },
  section: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#2D4BC2',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    paddingVertical: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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

export default DProfile;