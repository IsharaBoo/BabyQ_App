// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native';
// import axios from 'axios';

// type AddChannelingHistoryPageProps = {
//   onSubmit: (data: {
//     doctorId: string;
//     doctorName: string;
//     specialty: string;
//     appointmentDate: string;
//     doctorNotes: string;
//     medicalConditions: string;
//     symptoms: string;
//   }) => void;
// };

// const AddChannelingHistoryPage = ({ onSubmit }: AddChannelingHistoryPageProps) => {
//   const [doctorId, setDoctorId] = useState('');
//   const [doctorName, setDoctorName] = useState('');
//   const [specialty, setSpecialty] = useState('');
//   const [appointmentDate, setAppointmentDate] = useState('');
//   const [doctorNotes, setDoctorNotes] = useState('');
//   const [medicalConditions, setMedicalConditions] = useState('');
//   const [symptoms, setSymptoms] = useState('');

//   const handleSubmit = async () => {
//     if (!doctorId || !doctorName || !specialty || !appointmentDate || !doctorNotes || !medicalConditions || !symptoms) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     const newHistory = {
//       doctorId,
//       doctorName,
//       specialty,
//       appointmentDate,
//       doctorNotes,
//       medicalConditions,
//       symptoms
//     };

//     try {
//       // Make POST request to backend
//       const response = await axios.post('http://10.0.2.2:8082/api/channeling-history', newHistory);
//       if (response.status === 200) {
//         Alert.alert('Success', 'Channeling history added!');
//         onSubmit(newHistory); // Call the parent onSubmit prop if needed
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to add channeling history');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add Channeling History</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Doctor ID"
//         value={doctorId}
//         onChangeText={setDoctorId}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Doctor's Name"
//         value={doctorName}
//         onChangeText={setDoctorName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Specialty"
//         value={specialty}
//         onChangeText={setSpecialty}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Appointment Date (YYYY-MM-DD)"
//         value={appointmentDate}
//         onChangeText={setAppointmentDate}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Doctor's Notes"
//         value={doctorNotes}
//         onChangeText={setDoctorNotes}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Medical Conditions"
//         value={medicalConditions}
//         onChangeText={setMedicalConditions}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Symptoms"
//         value={symptoms}
//         onChangeText={setSymptoms}
//       />

//       <Button title="Submit" onPress={handleSubmit} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingLeft: 10,
//     fontSize: 16,
//     borderRadius: 5,
//   },
// });

// export default AddChannelingHistoryPage;















// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native';
// import axios from 'axios';

// type AddChannelingHistoryPageProps = {
//   onSubmit: (data: {
//     doctorId: string;
//     doctorName: string;
//     specialty: string;
//     appointmentDate: string;
//     doctorNotes: string;
//     medicalConditions: string;
//     symptoms: string;
//   }) => void;
// };

// const AddChannelingHistoryPage = ({ onSubmit }: AddChannelingHistoryPageProps) => {
//   const [doctorId, setDoctorId] = useState('');
//   const [doctorName, setDoctorName] = useState('');
//   const [specialty, setSpecialty] = useState('');
//   const [appointmentDate, setAppointmentDate] = useState('');
//   const [doctorNotes, setDoctorNotes] = useState('');
//   const [medicalConditions, setMedicalConditions] = useState('');
//   const [symptoms, setSymptoms] = useState('');

//   // ✅ Base API URL (Change to your server IP if needed)
//   const API_BASE_URL = 'http://8082/api/channeling-history'; 

//   const handleSubmit = async () => {
//     if (!doctorId ||!doctorName || !specialty || !appointmentDate || !doctorNotes || !medicalConditions || !symptoms) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     const newHistory = {
//       doctorId,
//       doctorName,
//       specialty,
//       appointmentDate,
//       doctorNotes,
//       medicalConditions,
//       symptoms,
//     };

//     try {
//       console.log('Sending data:', newHistory); // Debugging

//       const response = await axios.post(API_BASE_URL, newHistory, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       console.log('Response:', response.data); // Debugging

//       if (response.status === 200 || response.status === 201) {
//         Alert.alert('Success', 'Channeling history added successfully!');
//         onSubmit(newHistory);
//       } else {
//         Alert.alert('Error', 'Failed to add channeling history');
//       }
//     } catch (error: any) {
//       console.error('Error:', error);
//       Alert.alert('Error', 'Could not connect to the backend. Check server logs.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Add Channeling History</Text>

//       <TextInput style={styles.input} placeholder="Doctor ID" value={doctorId} onChangeText={setDoctorId} />
//       <TextInput style={styles.input} placeholder="Doctor's Name" value={doctorName} onChangeText={setDoctorName} />
//       <TextInput style={styles.input} placeholder="Specialty" value={specialty} onChangeText={setSpecialty} />
//       <TextInput style={styles.input} placeholder="Appointment Date (YYYY-MM-DD)" value={appointmentDate} onChangeText={setAppointmentDate} />
//       <TextInput style={styles.input} placeholder="Doctor's Notes" value={doctorNotes} onChangeText={setDoctorNotes} />
//       <TextInput style={styles.input} placeholder="Medical Conditions" value={medicalConditions} onChangeText={setMedicalConditions} />
//       <TextInput style={styles.input} placeholder="Symptoms" value={symptoms} onChangeText={setSymptoms} />

//       <Button title="Submit" onPress={handleSubmit} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingLeft: 10,
//     fontSize: 16,
//     borderRadius: 5,
//   },
// });

// export default AddChannelingHistoryPage;

























import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';

type AddChannelingHistoryPageProps = {
  onSubmit: (data: {
    // doctorId: string;
    doctorName: string;
    specialty: string;
    appointmentDate: string;
    doctorNotes: string;
    medicalConditions: string;
    symptoms: string;
  }) => void;
};

const AddChannelingHistoryPage = ({ onSubmit }: AddChannelingHistoryPageProps) => {
  // const [doctorId, setDoctorId] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [symptoms, setSymptoms] = useState('');



  const handleSubmit = async () => {
    if (
      // !doctorId ||
       !doctorName || !specialty || !appointmentDate || !doctorNotes || !medicalConditions || !symptoms) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newHistory = {
      // doctorId,
      doctorName,
      specialty,
      appointmentDate,
      doctorNotes,
      medicalConditions,
      symptoms,
    };

    try {
      console.log('Sending data:', newHistory); // Debugging

      const response = await axios.post("http://localhost:8082/api/channeling-history", newHistory, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response.data); // Debugging

      if (response.status === 200 || response.status === 201) {
        Alert.alert('Success', 'Channeling history added successfully!');
        onSubmit(newHistory);
       
      } else {
        Alert.alert('Error', 'Failed to add channeling history');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Could not connect to the backend. Check server logs.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Channeling History</Text>

      {/* <TextInput style={styles.input} placeholder="Doctor ID" value={doctorId} onChangeText={setDoctorId} /> */}
      <TextInput style={styles.input} placeholder="Doctor's Name" value={doctorName} onChangeText={setDoctorName} />
      <TextInput style={styles.input} placeholder="Specialty" value={specialty} onChangeText={setSpecialty} />
      <TextInput style={styles.input} placeholder="Appointment Date (YYYY-MM-DD)" value={appointmentDate} onChangeText={setAppointmentDate} />
      <TextInput style={styles.input} placeholder="Doctor's Notes" value={doctorNotes} onChangeText={setDoctorNotes} />
      <TextInput style={styles.input} placeholder="Medical Conditions" value={medicalConditions} onChangeText={setMedicalConditions} />
      <TextInput style={styles.input} placeholder="Symptoms" value={symptoms} onChangeText={setSymptoms} />

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
  },
});

export default AddChannelingHistoryPage;