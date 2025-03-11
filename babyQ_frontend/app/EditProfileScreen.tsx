import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const EditProfileScreen = () => {
  const router = useRouter();

  const [profile, setProfile] = useState({
    name: "Jane Samuel",
    phone: "+1 9876543210",
    email: "jane@email.com",
    childName: "Alex Samuel",
    age: "4",
    dob: "12/05/2020",
    gender: "Male",
    address: "123 Main St, City",
  });

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Profile</Text>

      {/* Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={profile.name} onChangeText={(text) => handleChange("name", text)} />
      </View>

      {/* Phone Number */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={profile.phone} onChangeText={(text) => handleChange("phone", text)} />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={profile.email} onChangeText={(text) => handleChange("email", text)} />
      </View>

      {/* Child Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name of the Child</Text>
        <TextInput style={styles.input} value={profile.childName} onChangeText={(text) => handleChange("childName", text)} />
      </View>

      {/* Age */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} value={profile.age} keyboardType="numeric" onChangeText={(text) => handleChange("age", text)} />
      </View>

      {/* DOB */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.input} value={profile.dob} onChangeText={(text) => handleChange("dob", text)} />
      </View>

      {/* Gender */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <TextInput style={styles.input} value={profile.gender} onChangeText={(text) => handleChange("gender", text)} />
      </View>

      {/* Address */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} value={profile.address} onChangeText={(text) => handleChange("address", text)} />
      </View>

      {/* Update Profile Button */}
      <TouchableOpacity style={styles.updateButton} onPress={() => router.back()}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  updateButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
