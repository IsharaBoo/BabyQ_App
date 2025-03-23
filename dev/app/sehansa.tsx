// import React from "react";
// import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
// import { Link } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";

// // Define the type for a review (for the reviews section)
// interface Review {
//   text: string;
//   rating: number;
// }

// const ProviderProfile: React.FC = () => {
//   const reviews: Review[] = [
//     { text: "Dr. John Mayers is highly recommended...", rating: 4.5 },
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       {/* Profile Header */}
//       <View style={styles.header}>
//         <Image
//           source={{ uri: "https://via.placeholder.com/100" }} // Replace with actual image URL
//           style={styles.profileImage}
//         />
//         <Text style={styles.name}>Dr. John Mayers</Text>
//         <Text style={styles.specialty}>Pediatrician</Text>
//       </View>

//       {/* Stats */}
//       <View style={styles.statsContainer}>
//         <View style={styles.stat}>
//           <Text style={styles.statValue}>1.8K</Text>
//           <Text style={styles.statLabel}>Patients</Text>
//         </View>
//         <View style={styles.stat}>
//           <Text style={styles.statValue}>5 yrs</Text>
//           <Text style={styles.statLabel}>Experience</Text>
//         </View>
//         <View style={styles.stat}>
//           <Text style={styles.statValue}>4.5</Text>
//           <Text style={styles.statLabel}>Rating</Text>
//         </View>
//       </View>

//       {/* About */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>About</Text>
//         <Text style={styles.sectionText}>
//           Dr. John Mayers is an experienced pediatrician with a focus on child health and development...
//         </Text>
//       </View>

//       {/* Education */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Education</Text>
//         <Text style={styles.sectionText}>Medical License Number: 1234567890</Text>
//         <Text style={styles.sectionText}>Place Number: 1234567890</Text>
//         <Text style={styles.sectionText}>School: Central Park Children’s Hospital</Text>
//       </View>

//       {/* Reviews */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Reviews</Text>
//         {reviews.map((review, index) => (
//           <View key={index} style={styles.review}>
//             <Text style={styles.reviewText}>{review.text}</Text>
//             <View style={styles.rating}>
//               <MaterialIcons name="star" size={16} color="#FFD700" />
//               <Text>{review.rating}</Text>
//             </View>
//           </View>
//         ))}
//       </View>

//       {/* Navigation Links */}
//       <View style={styles.navLinks}>
//         <Link href="./profile-setup" style={styles.link}>
//           <Text style={styles.linkText}>Go to Profile Setup</Text>
//         </Link>
//         <Link href="./provider-schedule" style={styles.link}>
//           <Text style={styles.linkText}>Go to Schedule</Text>
//         </Link>
//       </View>

//       {/* Book Appointment Button */}
//       <View style={styles.buttonContainer}>
//         <Text style={styles.buttonText}>Book Appointment</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 20 },
//   header: { alignItems: "center", marginBottom: 20 },
//   profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
//   name: { fontSize: 24, fontWeight: "bold" },
//   specialty: { fontSize: 16, color: "#666" },
//   statsContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
//   stat: { alignItems: "center" },
//   statValue: { fontSize: 18, fontWeight: "bold" },
//   statLabel: { fontSize: 14, color: "#666" },
//   section: { marginBottom: 20 },
//   sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   sectionText: { fontSize: 14, color: "#333" },
//   review: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
//   reviewText: { fontSize: 14, color: "#333", flex: 1 },
//   rating: { flexDirection: "row", alignItems: "center" },
//   navLinks: { marginBottom: 20 },
//   link: {
//     backgroundColor: "#007AFF",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     alignItems: "center",
//   },
//   linkText: { color: "#fff", fontSize: 16 },
//   buttonContainer: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });

// export default ProviderProfile;



























import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Link, useRouter } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const ProviderProfile: React.FC = () => {
  const router = useRouter();
  const reviews = [{ text: "Dr. John Mayers is highly recommended...", rating: 4.5 }];

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.profileImage} />
          <Text style={styles.name}>Dr. John Mayers</Text>
          <Text style={styles.specialty}>Pediatrician</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}><Text style={styles.statValue}>1.8K</Text><Text style={styles.statLabel}>Patients</Text></View>
          <View style={styles.stat}><Text style={styles.statValue}>5 yrs</Text><Text style={styles.statLabel}>Experience</Text></View>
          <View style={styles.stat}><Text style={styles.statValue}>4.5</Text><Text style={styles.statLabel}>Rating</Text></View>
        </View>

        <View style={styles.section}><Text style={styles.sectionTitle}>About</Text><Text style={styles.sectionText}>Dr. John Mayers is an experienced pediatrician...</Text></View>
        <View style={styles.section}><Text style={styles.sectionTitle}>Education</Text><Text style={styles.sectionText}>Medical License Number: 1234567890</Text></View>

        <View style={styles.section}><Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review, index) => (
            <View key={index} style={styles.review}>
              <Text style={styles.reviewText}>{review.text}</Text>
              <View style={styles.rating}><MaterialIcons name="star" size={16} color="#FFD700" /><Text>{review.rating}</Text></View>
            </View>
          ))}
        </View>

        <View style={styles.navLinks}>
          <Link href="./profile-setup" style={styles.link}><Text style={styles.linkText}>Go to Profile Setup</Text></Link>
          <Link href="./provider-schedule" style={styles.link}><Text style={styles.linkText}>Go to Schedule</Text></Link>
        </View>

        <View style={styles.buttonContainer}><Text style={styles.buttonText}>Book Appointment</Text></View>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 24, fontWeight: "bold" },
  specialty: { fontSize: 16, color: "#666" },
  statsContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 20 },
  stat: { alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "bold" },
  statLabel: { fontSize: 14, color: "#666" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  sectionText: { fontSize: 14, color: "#333" },
  review: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  reviewText: { fontSize: 14, color: "#333", flex: 1 },
  rating: { flexDirection: "row", alignItems: "center" },
  navLinks: { marginBottom: 20 },
  link: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5, marginBottom: 10, alignItems: "center" },
  linkText: { color: "#fff", fontSize: 16 },
  buttonContainer: { backgroundColor: "#007AFF", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  navbarContainer: { position: "absolute", bottom: 0, width: "100%", paddingVertical: 10, backgroundColor: "rgba(255,255,255,0.8)" },
  navbar: { flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#888" },
  activeNavText: { color: "#2D4BC2", fontWeight: "bold" },
});

export default ProviderProfile;