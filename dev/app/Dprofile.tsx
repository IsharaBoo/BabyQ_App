// import React, { useState } from 'react'; 
// import { StyleSheet, View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native'; 
// import { launchImageLibrary } from 'react-native-image-picker'; 
// import Icon from 'react-native-vector-icons/FontAwesome'; 

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

//   const saveChanges = () => {
//     console.log('Changes saved');
//   };

//   const selectImage = () => {
//     const options = { mediaType: 'photo' as const };
//     launchImageLibrary(options, (response) => {
//       if (response.assets && response.assets.length > 0) {
//         setProfilePic(response.assets[0].uri || 'https://example.com/default-profile-picture.jpg');
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
//         <Text style={styles.title}>Profile Page</Text>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput style={styles.input} value={name} onChangeText={setName} />
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.label}>Description</Text>
//         <TextInput style={styles.input} value={bio} onChangeText={setBio} />
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.label}>Email</Text>
//         <TextInput style={styles.input} value={email} onChangeText={setEmail} />
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.label}>Code</Text>
//         <TextInput style={styles.input} value={license} onChangeText={setLicense} />
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.label}>Specified Field</Text>
//         <TextInput style={styles.input} value={specialty} onChangeText={setSpecialty} />
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.label}>Phone Number</Text>
//         <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.label}>Hospital Name</Text>
//         <TextInput style={styles.input} value={workplace} onChangeText={setWorkplace} />
//       </View>
      
//       <View style={styles.section}>
//         <Text style={styles.label}>Year</Text>
//         <TextInput style={styles.input} value={startYear} onChangeText={setStartYear} />
//       </View>
      
//       <Button title="Save Changes" onPress={saveChanges} />
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
// });

// export default DProfile;