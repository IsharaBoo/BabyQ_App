// // UpcomingTestResultsScreen.tsx
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";

// const UpcomingTestResultsScreen = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upcoming Test Results</Text>
//       <Text>No upcoming test results.</Text>
//       <TouchableOpacity style={styles.button} onPress={() => router.back()}>
//         <Text style={styles.buttonText}>Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//   },
// });

// export default UpcomingTestResultsScreen;





import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";

interface FormData {
  name: string;
  phone: string;
  email: string;
  childName: string;
  age: string;
  dob: string;
  gender: string;
  address: string;
}

const UpcomingTestResultsScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    childName: "",
    age: "",
    dob: "",
    gender: "",
    address: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Test Results</Text>
      <Text>No upcoming test results.</Text>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  navbarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#888",
  },
  activeNavText: {
    color: "#2D4BC2",
    fontWeight: "bold",
  },
});

export default UpcomingTestResultsScreen;
