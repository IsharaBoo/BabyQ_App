// import React from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import { Link } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";

// // Define the type for an appointment
// interface Appointment {
//   time: string;
//   patient: string;
// }

// const ProviderSchedule: React.FC = () => {
//   const appointments: Appointment[] = [
//     { time: "10:00 AM - 10:30 AM", patient: "John Doe" },
//     { time: "11:00 AM - 11:30 AM", patient: "Jane Smith" },
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       {/* Profile Header */}
//       <View style={styles.header}>
//         <View style={styles.profileImage}>
//           <MaterialIcons name="person" size={50} color="#fff" />
//         </View>
//         <Text style={styles.title}>Doctor Profile</Text>
//       </View>

//       {/* Calendar */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Scheduled Appointments</Text>
//         <View style={styles.calendar}>
//           <Text style={styles.month}>January</Text>
//           <View style={styles.days}>
//             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//               <Text key={day} style={styles.dayLabel}>
//                 {day}
//               </Text>
//             ))}
//             {[...Array(31)].map((_, index) => (
//               <Text key={index + 1} style={styles.day}>
//                 {index + 1}
//               </Text>
//             ))}
//           </View>
//         </View>
//       </View>

//       {/* Appointments */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Today</Text>
//         {appointments.map((appointment, index) => (
//           <View key={index} style={styles.appointment}>
//             <Text style={styles.time}>{appointment.time}</Text>
//             <Text style={styles.patient}>Patient: {appointment.patient}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Navigation Links */}
//       <View style={styles.navLinks}>
//         <Link href="/" style={styles.link}>
//           <Text style={styles.linkText}>Back to Profile</Text>
//         </Link>
//         <Link href="/profile-setup" style={styles.link}>
//           <Text style={styles.linkText}>Go to Profile Setup</Text>
//         </Link>
//       </View>

//       {/* Navigation Buttons */}
//       <View style={styles.navButtons}>
//         <TouchableOpacity style={styles.navButton}>
//           <MaterialIcons name="home" size={24} color="#007AFF" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <MaterialIcons name="calendar-today" size={24} color="#007AFF" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navButton}>
//           <MaterialIcons name="person" size={24} color="#007AFF" />
//         </TouchableOpacity>
//       </View>
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
//   section: { marginBottom: 20 },
//   sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   calendar: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10 },
//   month: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
//   days: { flexDirection: "row", flexWrap: "wrap" },
//   dayLabel: { width: "14.28%", textAlign: "center", fontWeight: "bold", marginBottom: 5 },
//   day: { width: "14.28%", textAlign: "center", padding: 5 },
//   appointment: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10 },
//   time: { fontSize: 16, fontWeight: "bold" },
//   patient: { fontSize: 14, color: "#666" },
//   navLinks: { marginBottom: 20 },
//   link: {
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   linkText: { color: "#fff", fontSize: 16 },
//   navButtons: { flexDirection: "row", justifyContent: "space-around", marginTop: 20 },
//   navButton: { padding: 10 },
// });

// export default ProviderSchedule;
































import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";

const ProviderSchedule: React.FC = () => {
  const router = useRouter();

  const appointments = [
    { time: "10:00 AM - 10:30 AM", patient: "John Doe" },
    { time: "11:00 AM - 11:30 AM", patient: "Jane Smith" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profileImage}>
            <MaterialIcons name="person" size={50} color="#fff" />
          </View>
          <Text style={styles.title}>Doctor Profile</Text>
        </View>

        {/* Calendar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scheduled Appointments</Text>
          <View style={styles.calendar}>
            <Text style={styles.month}>January</Text>
            <View style={styles.days}>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <Text key={day} style={styles.dayLabel}>{day}</Text>
              ))}
              {[...Array(31)].map((_, index) => (
                <Text key={index + 1} style={styles.day}>{index + 1}</Text>
              ))}
            </View>
          </View>
        </View>

        {/* Appointments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          {appointments.map((appointment, index) => (
            <View key={index} style={styles.appointment}>
              <Text style={styles.time}>{appointment.time}</Text>
              <Text style={styles.patient}>Patient: {appointment.patient}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
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
  header: { alignItems: "center", marginBottom: 20, paddingTop: 20 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  section: { marginBottom: 20, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  calendar: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10 },
  month: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  days: { flexDirection: "row", flexWrap: "wrap" },
  dayLabel: { width: "14.28%", textAlign: "center", fontWeight: "bold", marginBottom: 5 },
  day: { width: "14.28%", textAlign: "center", padding: 5 },
  appointment: { borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginBottom: 10 },
  time: { fontSize: 16, fontWeight: "bold" },
  patient: { fontSize: 14, color: "#666" },
  navbarContainer: { position: "absolute", bottom: 0, width: "100%" },
  navbar: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "rgba(255,255,255,0.9)", paddingVertical: 10 },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#888", marginTop: 5 },
  activeNavText: { color: "#2D4BC2", fontWeight: "bold" },
});

export default ProviderSchedule;