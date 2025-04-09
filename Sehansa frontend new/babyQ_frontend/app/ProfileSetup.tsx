import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { launchImageLibrary, Asset } from "react-native-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

const DoctorProfileSetup: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [availability, setAvailability] = useState("");

  const selectImage = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: "photo" });
      if (result.didCancel) {
        console.log("User cancelled image picker");
      } else if (result.errorCode) {
        Alert.alert("Error", result.errorMessage || "An unknown error occurred");
      } else if (result.assets && result.assets.length > 0) {
        const asset: Asset = result.assets[0];
        if (asset.uri) {
          setProfileImage(asset.uri);
        }
      }
    } catch (error) {
      console.error("Image picker error:", error);
    }
  };

  const handleSave = () => {
    Alert.alert("Profile Saved", `Dr. ${fullName}'s profile has been saved.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Doctor Profile Setup</Text>

      <TouchableOpacity style={styles.profileImage} onPress={selectImage}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.imageStyle} />
        ) : (
          <MaterialIcons name="person" size={50} color="#fff" />
        )}
      </TouchableOpacity>
      <Text style={styles.subtitle}>Tap to change profile picture</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Specialization (e.g. Cardiologist)"
        value={specialization}
        onChangeText={setSpecialization}
      />
      <TextInput
        style={styles.input}
        placeholder="Years of Experience"
        keyboardType="numeric"
        value={experience}
        onChangeText={setExperience}
      />
      <TextInput
        style={styles.input}
        placeholder="Clinic/Hospital Name"
        value={clinicName}
        onChangeText={setClinicName}
      />
      <TextInput
        style={styles.input}
        placeholder="Medical License Number"
        value={licenseNumber}
        onChangeText={setLicenseNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Clinic Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Available Times (e.g. 9am - 5pm)"
        value={availability}
        onChangeText={setAvailability}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "white",
    flexGrow: 1,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  imageStyle: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DoctorProfileSetup;
