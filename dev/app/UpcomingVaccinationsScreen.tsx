// // UpcomingVaccinationsScreen.tsx
// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useRouter } from "expo-router";

// const UpcomingVaccinationsScreen = () => {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upcoming Vaccinations</Text>
//       <Text>No upcoming vaccinations.</Text>
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

// export default UpcomingVaccinationsScreen;





import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { FontAwesome } from "@expo/vector-icons";

const UpcomingVaccinationsScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Vaccinations</Text>
      <Text>No upcoming vaccinations.</Text>
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

export default UpcomingVaccinationsScreen;





// UpcomingVaccinationsScreen.js
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import { getData } from "./api";  // Importing the API functions

// const UpcomingVaccinationsScreen = () => {
//   const [vaccinations, setVaccinations] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchVaccinations = async () => {
//       try {
//         const data = await getData('/vaccinations/upcoming');  // Assuming '/vaccinations/upcoming' is an endpoint
//         setVaccinations(data);
//       } catch (error) {
//         Alert.alert('Error', 'Failed to fetch vaccinations');
//       }
//     };
//     fetchVaccinations();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Upcoming Vaccinations</Text>
//       {vaccinations.length === 0 ? (
//         <Text>No upcoming vaccinations</Text>
//       ) : (
//         vaccinations.map((vaccination, index) => (
//           <Text key={index}>{vaccination.name} - {vaccination.date}</Text>
//         ))
//       )}
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

// export default UpcomingVaccinationsScreen;
