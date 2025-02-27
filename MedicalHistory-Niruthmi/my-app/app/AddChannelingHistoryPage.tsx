// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

// // Define the type for the props
// type AddChannelingHistoryPageProps = {
//   onSubmit: (data: { doctorName: string; specialty: string; appointmentDate: string }) => void;
// };

// const AddChannelingHistoryPage = ({ onSubmit }: AddChannelingHistoryPageProps) => {
//   const [doctorName, setDoctorName] = useState('');
//   const [specialty, setSpecialty] = useState('');
//   const [appointmentDate, setAppointmentDate] = useState('');

//   const handleSubmit = () => {
//     if (!doctorName || !specialty || !appointmentDate) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     // Call the onSubmit function passed as a prop
//     onSubmit({ doctorName, specialty, appointmentDate });
//     Alert.alert('Success', 'Channeling history added!');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Channeling History</Text>

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

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
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

type AddChannelingHistoryPageProps = {
  onSubmit: (data: {
    doctorName: string;
    specialty: string;
    appointmentDate: string;
    doctorNotes: string;
    medicalConditions: string;
    symptoms: string;
  }) => void;
};

const AddChannelingHistoryPage = ({ onSubmit }: AddChannelingHistoryPageProps) => {
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = () => {
    if (!doctorName || !specialty || !appointmentDate || !doctorNotes || !medicalConditions || !symptoms) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Call the onSubmit function passed as a prop with the additional fields
    onSubmit({
      doctorName,
      specialty,
      appointmentDate,
      doctorNotes,
      medicalConditions,
      symptoms,
    });
    Alert.alert('Success', 'Channeling history added!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Channeling History</Text>

      <TextInput
        style={styles.input}
        placeholder="Doctor's Name"
        value={doctorName}
        onChangeText={setDoctorName}
      />

      <TextInput
        style={styles.input}
        placeholder="Specialty"
        value={specialty}
        onChangeText={setSpecialty}
      />

      <TextInput
        style={styles.input}
        placeholder="Appointment Date (YYYY-MM-DD)"
        value={appointmentDate}
        onChangeText={setAppointmentDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Doctor's Notes"
        value={doctorNotes}
        onChangeText={setDoctorNotes}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Medical Conditions"
        value={medicalConditions}
        onChangeText={setMedicalConditions}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Symptoms"
        value={symptoms}
        onChangeText={setSymptoms}
        multiline
      />

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















