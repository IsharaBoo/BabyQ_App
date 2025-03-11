import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const DProfile = () => {
  const [name, setName] = useState('Dr. John Doe');
  const [bio, setBio] = useState('Experienced Pediatrician with a passion for child health.');
  const [email, setEmail] = useState('johndoe@example.com');
  const [license, setLicense] = useState('123456789');
  const [specialty, setSpecialty] = useState('Pediatrics');
  const [phone, setPhone] = useState('+1 234 567 890');
  const [workplace, setWorkplace] = useState('St. Sebastian Children\'s Hospital');
  const [startYear, setStartYear] = useState('2015');
  const [profilePic, setProfilePic] = useState('https://example.com/profile-picture.jpg');

  const saveChanges = () => {
    // Add logic to save changes here
    console.log('Changes saved');
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setProfilePic(response.assets[0].uri);
      } else {
        console.log('Unknown response format');
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profilePictureContainer}>
          <Image
            style={styles.profilePicture}
            source={{ uri: profilePic }}
          />
          <TouchableOpacity style={styles.cameraIcon} onPress={selectImage}>
            <Icon name="camera" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Profile Page</Text>
      </View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={license}
        onChangeText={setLicense}
        placeholder="Medical License Number"
      />
      <TextInput
        style={styles.input}
        value={specialty}
        onChangeText={setSpecialty}
        placeholder="Specialty"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
      />
      <TextInput
        style={styles.input}
        value={workplace}
        onChangeText={setWorkplace}
        placeholder="Current Work Place"
      />
      <TextInput
        style={styles.input}
        value={startYear}
        onChangeText={setStartYear}
        placeholder="Starting Year"
      />
      <Button title="Save Changes" onPress={saveChanges} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePictureContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2, // Add this line for the black border
    borderColor: '#000', // Add this line for the black border color
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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default DProfile;
