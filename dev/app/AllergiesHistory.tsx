
// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
// import { FAB } from 'react-native-paper';
// import axios from 'axios';
// // import AddAllergyHistoryPage from './AddAllergyHistoryPage';

// type AllergyHistoryEntry = {
//   allergyName: string;
//   reaction: string;
//   lastExposureDate: string;
// };

// const AllergiesHistory = () => {
//   const [allergyHistory, setAllergyHistory] = useState<AllergyHistoryEntry[]>([]);
//   const [showAddPage, setShowAddPage] = useState(false);

//   // Fetch allergy history from the backend
//   useEffect(() => {
//     const fetchAllergyHistory = async () => {
//       try {
//         const response = await axios.get('http://localhost:8082/api/allergy-history');
//         setAllergyHistory(response.data); // Assuming response data is an array of allergy history entries
//       } catch (error) {
//         console.error('Error fetching allergy history:', error);
//         Alert.alert('Error', 'Failed to fetch allergy history. Please try again later.');
//       }
//     };

//     fetchAllergyHistory();
//   }, []);

//   const handleAddAllergyHistory = (newHistory: AllergyHistoryEntry) => {
//     setAllergyHistory((prevHistory) => [...prevHistory, newHistory]);
//     setShowAddPage(false); // Close the AddAllergyHistoryPage after submitting
//   };

//   const handleAddAllergyPage = () => {
//     setShowAddPage(true); // Show the AddAllergyHistoryPage
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Allergy History</Text>

//       {/* Display existing allergy history */}
//       <View style={styles.historyContainer}>
//         {allergyHistory.length === 0 ? (
//           <Text>No allergy history available.</Text>
//         ) : (
//           allergyHistory.map((history, index) => (
//             <View key={index} style={styles.record}>
//               <Text style={styles.allergyName}>{history.allergyName}</Text>
//               <Text style={styles.reaction}>Reaction: {history.reaction}</Text>
//               <Text style={styles.date}>Last Exposure: {history.lastExposureDate}</Text>
//             </View>
//           ))
//         )}
//       </View>

//       {/* Floating Action Button for adding allergy history */}
//       {/* <FAB
//         style={styles.fab}
//         icon="plus"
//         onPress={handleAddAllergyPage}
//       /> */}
      
//       {/* Show AddAllergyHistoryPage if showAddPage is true */}
//       {/* {showAddPage && <AddAllergyHistoryPage onSubmit={handleAddAllergyHistory} />} */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   historyContainer: {
//     marginBottom: 20,
//   },
//   record: {
//     marginBottom: 15,
//     padding: 15,
//     backgroundColor: '#f2f2f2',
//     borderRadius: 10,
//   },
//   allergyName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   reaction: {
//     fontSize: 16,
//     color: '#666',
//   },
//   date: {
//     fontSize: 14,
//     color: '#888',
//   },
//   fab: {
//     position: 'absolute',
//     bottom: 20,  // Adjusted to a visible spot
//     right: 20,   // Positioned to the right
//     backgroundColor: '#007AFF',
//   },
// });

// export default AllergiesHistory;



















// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, StyleSheet, Alert, TextInput } from 'react-native';
// import { FAB } from 'react-native-paper';
// import axios from 'axios';

// type AllergyHistoryEntry = {
//   allergyName: string;
//   reaction: string;
//   lastExposureDate: string;
// };

// const AllergiesHistory = () => {
//   const [allergyHistory, setAllergyHistory] = useState<AllergyHistoryEntry[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredHistory, setFilteredHistory] = useState<AllergyHistoryEntry[]>([]);

//   useEffect(() => {
//     const fetchAllergyHistory = async () => {
//       try {
//         const response = await axios.get('http://localhost:8082/api/allergy-history');
//         setAllergyHistory(response.data);
//         setFilteredHistory(response.data); // Initialize filtered data
//       } catch (error) {
//         console.error('Error fetching allergy history:', error);
//         Alert.alert('Error', 'Failed to fetch allergy history. Please try again later.');
//       }
//     };

//     fetchAllergyHistory();
//   }, []);

//   useEffect(() => {
//     const filteredData = allergyHistory.filter((entry) =>
//       entry.allergyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       entry.reaction.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       entry.lastExposureDate.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredHistory(filteredData);
//   }, [searchQuery, allergyHistory]);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Allergy History</Text>

//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search by allergy, reaction, or date..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//       />

//       {/* Display existing allergy history */}
//       <View style={styles.historyContainer}>
//         {filteredHistory.length === 0 ? (
//           <Text>No matching allergy history found.</Text>
//         ) : (
//           filteredHistory.map((history, index) => (
//             <View key={index} style={styles.record}>
//               <Text style={styles.allergyName}>{history.allergyName}</Text>
//               <Text style={styles.reaction}>Reaction: {history.reaction}</Text>
//               <Text style={styles.date}>Last Exposure: {history.lastExposureDate}</Text>
//             </View>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   searchBar: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//   },
//   historyContainer: {
//     marginBottom: 20,
//   },
//   record: {
//     marginBottom: 15,
//     padding: 15,
//     backgroundColor: '#f2f2f2',
//     borderRadius: 10,
//   },
//   allergyName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   reaction: {
//     fontSize: 16,
//     color: '#666',
//   },
//   date: {
//     fontSize: 14,
//     color: '#888',
//   },
// });

// export default AllergiesHistory;

































//after appling the bottom navigation

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TextInput, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';

type AllergyHistoryEntry = {
  allergyName: string;
  reaction: string;
  lastExposureDate: string;
};

const AllergiesHistory = () => {
  const [allergyHistory, setAllergyHistory] = useState<AllergyHistoryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHistory, setFilteredHistory] = useState<AllergyHistoryEntry[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAllergyHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/allergy-history');
        setAllergyHistory(response.data);
        setFilteredHistory(response.data); // Initialize filtered data
      } catch (error) {
        console.error('Error fetching allergy history:', error);
        Alert.alert('Error', 'Failed to fetch allergy history. Please try again later.');
      }
    };

    fetchAllergyHistory();
  }, []);

  useEffect(() => {
    const filteredData = allergyHistory.filter((entry) =>
      entry.allergyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.reaction.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.lastExposureDate.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHistory(filteredData);
  }, [searchQuery, allergyHistory]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Allergy History</Text>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search by allergy, reaction, or date..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Display existing allergy history */}
        <View style={styles.historyContainer}>
          {filteredHistory.length === 0 ? (
            <Text>No matching allergy history found.</Text>
          ) : (
            filteredHistory.map((history, index) => (
              <View key={index} style={styles.record}>
                <Text style={styles.allergyName}>{history.allergyName}</Text>
                <Text style={styles.reaction}>Reaction: {history.reaction}</Text>
                <Text style={styles.date}>Last Exposure: {history.lastExposureDate}</Text>
              </View>
            ))
          )}
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  historyContainer: {
    marginBottom: 20,
  },
  record: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  allergyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reaction: {
    fontSize: 16,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  activeNavText: {
    color: '#2D4BC2',
    fontWeight: 'bold',
  },
});

export default AllergiesHistory;
