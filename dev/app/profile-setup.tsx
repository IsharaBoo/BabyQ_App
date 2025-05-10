// import React, { useState } from "react";
// import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import { Link } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";

// const ProfileSetup: React.FC = () => {
//   const [name, setName] = useState<string>("Dr. John");
//   const [specialty, setSpecialty] = useState<string>("Pediatrician");
//   const [license, setLicense] = useState<string>("1234567890");
//   const [placeNumber, setPlaceNumber] = useState<string>("1234567890");
//   const [school, setSchool] = useState<string>("Central Park Children’s Hospital");

//   return (
//     <ScrollView style={styles.container}>
//       {/* Profile Header */}
//       <View style={styles.header}>
//         <View style={styles.profileImage}>
//           <MaterialIcons name="person" size={50} color="#fff" />
//         </View>
//         <Text style={styles.title}>Your Profile</Text>
//       </View>

//       {/* Form */}
//       <View style={styles.form}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={styles.input}
//           value={name}
//           onChangeText={(text: string) => setName(text)}
//           placeholder="Enter your name"
//         />

//         <Text style={styles.label}>Specialty</Text>
//         <TextInput
//           style={styles.input}
//           value={specialty}
//           onChangeText={(text: string) => setSpecialty(text)}
//           placeholder="Enter your specialty"
//         />

//         <Text style={styles.label}>Medical License Number</Text>
//         <TextInput
//           style={styles.input}
//           value={license}
//           onChangeText={(text: string) => setLicense(text)}
//           placeholder="Enter your license number"
//         />

//         <Text style={styles.label}>Place Number</Text>
//         <TextInput
//           style={styles.input}
//           value={placeNumber}
//           onChangeText={(text: string) => setPlaceNumber(text)}
//           placeholder="Enter your place number"
//         />

//         <Text style={styles.label}>School</Text>
//         <TextInput
//           style={styles.input}
//           value={school}
//           onChangeText={(text: string) => setSchool(text)}
//           placeholder="Enter your school"
//         />
//       </View>

//       {/* Navigation Links */}
//       <View style={styles.navLinks}>
//         <Link href="/" style={styles.link}>
//           <Text style={styles.linkText}>Back to Profile</Text>
//         </Link>
//         <Link href="/provider-schedule" style={styles.link}>
//           <Text style={styles.linkText}>Go to Schedule</Text>
//         </Link>
//       </View>

//       {/* Save Changes Button */}
//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Save Changes</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   header: { alignItems: "center", marginBottom: 20 },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "#007AFF",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   title: { fontSize: 20, fontWeight: "bold" },
//   form: { marginBottom: 20 },
//   label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 16,
//   },
//   navLinks: { marginBottom: 20 },
//   link: {
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   linkText: { color: "#fff", fontSize: 16 },
//   button: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });

// export default ProfileSetup;


























import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const ProfileSetup: React.FC = () => {
  const [name, setName] = useState<string>("Dr. John");
  const [specialty, setSpecialty] = useState<string>("Pediatrician");
  const [license, setLicense] = useState<string>("1234567890");
  const [placeNumber, setPlaceNumber] = useState<string>("1234567890");
  const [school, setSchool] = useState<string>("Central Park Children’s Hospital");

  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImage}>
            <MaterialIcons name="person" size={50} color="#fff" />
          </View>
          <Text style={styles.title}>Your Profile</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />

          <Text style={styles.label}>Specialty</Text>
          <TextInput style={styles.input} value={specialty} onChangeText={setSpecialty} placeholder="Enter your specialty" />

          <Text style={styles.label}>Medical License Number</Text>
          <TextInput style={styles.input} value={license} onChangeText={setLicense} placeholder="Enter your license number" />

          <Text style={styles.label}>Place Number</Text>
          <TextInput style={styles.input} value={placeNumber} onChangeText={setPlaceNumber} placeholder="Enter your place number" />

          <Text style={styles.label}>School</Text>
          <TextInput style={styles.input} value={school} onChangeText={setSchool} placeholder="Enter your school" />
        </View>

        {/* Navigation Links */}
        <View style={styles.navLinks}>
          <Link href="/" style={styles.link}>
            <Text style={styles.linkText}>Back to Profile</Text>
          </Link>
          <Link href="/provider-schedule" style={styles.link}>
            <Text style={styles.linkText}>Go to Schedule</Text>
          </Link>
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 🔥 Bottom Navbar */}
      <BlurView intensity={20} style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./home')}>
            <FontAwesome name="home" size={22} color="#2D4BC2" />
            <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./community')}>
            <FontAwesome name="users" size={22} color="#888" />
            <Text style={styles.navText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./CHDR')}>
            <FontAwesome name="line-chart" size={22} color="#888" />
            <Text style={styles.navText}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./MedicalHistory')}>
            <FontAwesome name="file-text" size={22} color="#888" />
            <Text style={styles.navText}>Medical History</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: { padding: 20, paddingBottom: 80 }, // To avoid overlap with navbar
  header: { alignItems: "center", marginBottom: 20 },
  profileImage: {
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "#007AFF", justifyContent: "center", alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  form: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: {
    borderWidth: 1, borderColor: "#ccc", borderRadius: 5,
    padding: 10, marginBottom: 15, fontSize: 16,
  },
  navLinks: { marginBottom: 20 },
  link: {
    backgroundColor: "#007AFF", padding: 10, borderRadius: 5,
    marginBottom: 10, alignItems: "center",
  },
  linkText: { color: "#fff", fontSize: 16 },
  button: {
    backgroundColor: "#007AFF", padding: 15, borderRadius: 10, alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  /* 📌 Bottom Navbar */
  navbarContainer: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    height: 70, backgroundColor: "rgba(255,255,255,0.8)",
    borderTopWidth: 1, borderTopColor: "#ddd",
  },
  navbar: {
    flexDirection: "row", justifyContent: "space-around", alignItems: "center",
    height: "100%",
  },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#888", marginTop: 4 },
  activeNavText: { color: "#2D4BC2", fontWeight: "bold" },
});

export default ProfileSetup;











