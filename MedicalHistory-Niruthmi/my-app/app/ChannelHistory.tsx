
// import React, { useState } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { FAB } from 'react-native-paper';
// import AddChannelingHistoryPage from './AddChannelingHistoryPage'; // Correct import


// // Define the type for each entry in channeling history
// type ChannelHistoryEntry = {
//   doctorName: string;
//   specialty: string;
//   appointmentDate: string;
// };

// const ChannelHistory = () => {


//   // Explicitly define the type of channelingHistory state
//   const [channelingHistory, setChannelingHistory] = useState<ChannelHistoryEntry[]>([]);

//   const [showAddPage, setShowAddPage] = useState(false);

//   const handleAddChannelingHistory = (newHistory: ChannelHistoryEntry) => {
//     setChannelingHistory((prevHistory) => [...prevHistory, newHistory]);
//     setShowAddPage(false); // Close the AddChannelingHistoryPage after submitting
//   };

//   const handleAddChannelingPage = () => {
//     setShowAddPage(true); // Show the AddChannelingHistoryPage
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Channel History</Text>

//       {/* Display existing channeling history */}
//       <View style={styles.historyContainer}>
//         {channelingHistory.length === 0 ? (
//           <Text>No channeling history available.</Text> // Display message if no records exist
//         ) : (
//           channelingHistory.map((history, index) => (
//             <View key={index} style={styles.record}>
//               <Text style={styles.doctorName}>{history.doctorName}</Text>
//               <Text style={styles.specialty}>{history.specialty}</Text>
//               <Text style={styles.date}>Date: {history.appointmentDate}</Text>
//             </View>
//           ))
//         )}
//       </View>

//       {/* Floating Action Button for adding channeling history */}
//       <FAB
//         style={styles.fab}
//         icon="plus"
//         onPress={handleAddChannelingPage}
//       />
      

//       {/* Show AddChannelingHistoryPage if showAddPage is true */}
//       {showAddPage && <AddChannelingHistoryPage onSubmit={handleAddChannelingHistory} />}



      
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
//   doctorName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   specialty: {
//     fontSize: 16,
//     color: '#666',
//   },
//   date: {
//     fontSize: 14,
//     color: '#888',
//   },
//   fab: {
//     position: 'absolute',
//     bottom: 20,  // Position from the bottom
//     right: 20,   // Position from the right
//     backgroundColor: '#007AFF',
   
//   },
// });

// export default ChannelHistory;


















// import React, { useState } from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { FAB } from 'react-native-paper';
// import AddChannelingHistoryPage from './AddChannelingHistoryPage';

// // Define the type for each entry in channeling history
// type ChannelHistoryEntry = {
//   doctorName: string;
//   specialty: string;
//   appointmentDate: string;
//   doctorNotes: string;
//   medicalConditions: string;
//   symptoms: string;
// };

// const ChannelHistory = () => {
//   // Define the type for channelingHistory state
//   const [channelingHistory, setChannelingHistory] = useState<ChannelHistoryEntry[]>([]);
//   const [showAddPage, setShowAddPage] = useState(false);

//   const handleAddChannelingHistory = (newHistory: ChannelHistoryEntry) => {
//     setChannelingHistory((prevHistory) => [...prevHistory, newHistory]);
//     setShowAddPage(false); // Close the AddChannelingHistoryPage after submitting
//   };

//   const handleAddChannelingPage = () => {
//     setShowAddPage(true); // Show the AddChannelingHistoryPage
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Channel History</Text>

//       {/* Display existing channeling history */}
//       <View style={styles.historyContainer}>
//         {channelingHistory.length === 0 ? (
//           <Text>No channeling history available.</Text>
//         ) : (
//           channelingHistory.map((history, index) => (
//             <View key={index} style={styles.record}>
//               <Text style={styles.doctorName}>{history.doctorName}</Text>
//               <Text style={styles.specialty}>{history.specialty}</Text>
//               <Text style={styles.date}>Date: {history.appointmentDate}</Text>
//               <Text style={styles.notes}>Doctor's Notes: {history.doctorNotes}</Text>
//               <Text style={styles.conditions}>Medical Conditions: {history.medicalConditions}</Text>
//               <Text style={styles.symptoms}>Symptoms: {history.symptoms}</Text>
//             </View>
//           ))
//         )}
//       </View>

//       {/* Floating Action Button for adding channeling history */}
//       <FAB style={styles.fab} icon="plus" onPress={handleAddChannelingPage} />

//       {/* Show AddChannelingHistoryPage if showAddPage is true */}
//       {showAddPage && <AddChannelingHistoryPage onSubmit={handleAddChannelingHistory} />}
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
//   doctorName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   specialty: {
//     fontSize: 16,
//     color: '#666',
//   },
//   date: {
//     fontSize: 14,
//     color: '#888',
//   },
//   notes: {
//     fontSize: 14,
//     color: '#444',
//     marginTop: 5,
//   },
//   conditions: {
//     fontSize: 14,
//     color: '#444',
//     marginTop: 5,
//   },
//   symptoms: {
//     fontSize: 14,
//     color: '#444',
//     marginTop: 5,
//   },
//   fab: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#007AFF',
//   },
// });

// export default ChannelHistory;




















import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import AddChannelingHistoryPage from './AddChannelingHistoryPage';

// Define the type for each entry in channeling history
type ChannelHistoryEntry = {
  doctorId: string;
  doctorName: string;
  specialty: string;
  appointmentDate: string;
  doctorNotes: string;
  medicalConditions: string;
  symptoms: string;
};

const ChannelHistory = () => {
  // Define the type for channelingHistory state
  const [channelingHistory, setChannelingHistory] = useState<ChannelHistoryEntry[]>([]);
  const [showAddPage, setShowAddPage] = useState(false);

  const handleAddChannelingHistory = (newHistory: ChannelHistoryEntry) => {
    setChannelingHistory((prevHistory) => [...prevHistory, newHistory]);
    setShowAddPage(false); // Close the AddChannelingHistoryPage after submitting
  };

  const handleAddChannelingPage = () => {
    setShowAddPage(true); // Show the AddChannelingHistoryPage
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Channel History</Text>

      {/* Display existing channeling history */}
      <View style={styles.historyContainer}>
        {channelingHistory.length === 0 ? (
          <Text>No channeling history available.</Text>
        ) : (
          channelingHistory.map((history, index) => (
            <View key={index} style={styles.record}>
              <Text style={styles.doctorName}>{history.doctorName} 
                {/* (ID: {history.doctorId}) */}
                </Text>
              <Text style={styles.specialty}>{history.specialty}</Text>
              <Text style={styles.date}>Date: {history.appointmentDate}</Text>
              <Text style={styles.notes}>Doctor's Notes: {history.doctorNotes}</Text>
              <Text style={styles.conditions}>Medical Conditions: {history.medicalConditions}</Text>
              <Text style={styles.symptoms}>Symptoms: {history.symptoms}</Text>
            </View>
          ))
        )}
      </View>

      {/* Floating Action Button for adding channeling history */}
      <FAB style={styles.fab} icon="plus" onPress={handleAddChannelingPage} color="white" />

      {/* Show AddChannelingHistoryPage if showAddPage is true */}
      {showAddPage && <AddChannelingHistoryPage onSubmit={handleAddChannelingHistory} />}
    </ScrollView>
  );
};

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
  historyContainer: {
    marginBottom: 20,
  },
  record: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialty: {
    fontSize: 16,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  notes: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  conditions: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  symptoms: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'darkblue',
    
  },
});

export default ChannelHistory;
