// import React from 'react';
// import { Linking } from 'react-native';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Button } from 'react-native-paper';
// import * as WebBrowser from 'expo-web-browser';
// import { useState } from 'react';



// const MedicalHistoryPage = () => {
//   const router = useRouter();

//   const goToChannelingHistory = () => {
//     router.push('/ChannelHistory');
//   };
//   const goToAllergiesHistory = () => {
//     router.push('./AllergiesHistory');
//   };
 

//   const goToViewReports = () => {
//     WebBrowser.openBrowserAsync('http://localhost:5173/'); // This will open in the browser
//   };








//   const goToVaccinationHistory = () => {
//     router.push('/VaccinationHistory');
//   };
//   const goToGrowthDataPage = () => {
//     router.push('/GrowthDataPage');
//   };
//   const goToChatbot = () => {
//     router.push('/Chatbot');
//   };
  

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Medical History</Text>
      
      

//       <Button 
//         mode="contained" 
//         onPress={goToChannelingHistory}
//         style={styles.button}
//       >
//        Doctor Channelings
//       </Button>
//        <Button 
//         mode="contained" 
//         onPress={goToAllergiesHistory}
//         style={styles.button}
//       >
//        Allergies
//       </Button>
//       <Button 
//         mode="contained" 
//         onPress={goToViewReports}
//         style={styles.button}
//       >
//         Reports
//       </Button>
//       <Button 
//         mode="contained" 
//         onPress={goToVaccinationHistory}
//         style={styles.button}
//       >
//         Vaccination
//       </Button>
//       <Button 
//         mode="contained" 
//         onPress={goToGrowthDataPage}
//         style={styles.button}
//       >
//         Growth Data
//       </Button> 

      
//       <Button 
//         mode="contained" 
//         onPress={goToChatbot}
//         style={styles.button}
//       >
//         Chatbot
//       </Button> 


//     </ScrollView>
//   );

// };

// export default MedicalHistoryPage;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     backgroundColor: '#fff',
//     // backgroundColor: "#F0F5FF",
//     // backgroundColor: '#FCFCFF',

//     // // backgroundColor: "rgb(240, 242, 246)",
//     // backgroundColor: "#E3F2FD",
//     padding: 20,
//     // color: '#2D4BC2'
    
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
 
//   },
//   section: {
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 3,
//   },
//   button: {
//     marginTop: 20,
//     borderRadius: 10,
//     backgroundColor:'darkblue',
//   },





// });
























import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { BlurView } from 'expo-blur'; // Import BlurView
import { FontAwesome } from '@expo/vector-icons'; // Import Icons

const MedicalHistoryPage = () => {
  const router = useRouter();

  const goToChannelingHistory = () => router.push('/ChannelHistory');
  const goToAllergiesHistory = () => router.push('/AllergiesHistory');
  const goToViewReports = () => WebBrowser.openBrowserAsync('http://localhost:5173/');
  const goToVaccinationHistory = () => router.push('/VaccinationHistory');
  const goToGrowthDataPage = () => router.push('/GrowthDataPage');
  const goToChatbot = () => router.push('/Chatbot');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Medical History</Text>

        <Button mode="contained" onPress={goToChannelingHistory} style={styles.button}>
          Doctor Channelings
        </Button>
        <Button mode="contained" onPress={goToAllergiesHistory} style={styles.button}>
          Allergies
        </Button>
        <Button mode="contained" onPress={goToViewReports} style={styles.button}>
          Reports
        </Button>
        <Button mode="contained" onPress={goToVaccinationHistory} style={styles.button}>
          Vaccination
        </Button>
        <Button mode="contained" onPress={goToGrowthDataPage} style={styles.button}>
          Growth Data
        </Button>
        <Button mode="contained" onPress={goToChatbot} style={styles.button}>
          Allergy Prediction
        </Button>
      </ScrollView>

      {/* Bottom Navbar */}
      <BlurView intensity={20} style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/home')}>
            <FontAwesome name="home" size={22} color="#888" />
            <Text style={[styles.navText, styles.navText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => Alert.alert('Info', 'Community page not available')}>
            <FontAwesome name="users" size={22} color="#888" />
            <Text style={styles.navText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/CHDR')}>
            <FontAwesome name="line-chart" size={22} color="#888" />
            <Text style={styles.navText}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Channel')}>
            <FontAwesome name="file-text" size={22} color="#2D4BC2" />
            <Text style={styles.activeNavText}>Medical History</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

export default MedicalHistoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'darkblue',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent effect
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    fontWeight: 'bold',
    color: '#2D4BC2',
  },
});
