<<<<<<< HEAD
// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   ScrollView,
//   Button,
//   TouchableOpacity,
//   TextInput,
//   Dimensions,
//   Platform,
//   Alert,
// } from 'react-native';
// import { Rating } from 'react-native-elements';
// import { Calendar } from 'react-native-calendars';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';
=======
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { Rating } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> 5ef2c003ad76758d9e2eb75629d3f5367abb6b06

// const { width, height } = Dimensions.get('window');

<<<<<<< HEAD
// const getBackendUrl = () => {
//   if (Platform.OS === 'web') {
//     return 'http://localhost:8082';
//   } else if (Platform.OS === 'android') {
//     return 'http://10.0.2.2:8082'; // Emulator
//   } else {
//     return 'http://192.168.1.100:8082'; // iOS and physical devices - replace with your IP
//   }
// };
=======
const getBackendUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:8082';
  else if (Platform.OS === 'android') return 'http://10.0.2.2:8082'; // Emulator
  else return 'http://192.168.8.119:8082'; // Physical device - ensure this is correct
};
>>>>>>> 5ef2c003ad76758d9e2eb75629d3f5367abb6b06

// const backendUrl = getBackendUrl();

<<<<<<< HEAD
// const App = () => {
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedTime, setSelectedTime] = useState('');
//   const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
//   const [reviews, setReviews] = useState({});
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(0);
//   const [userName, setUserName] = useState('');
//   const [page, setPage] = useState('home');
//   const [bookedTimes, setBookedTimes] = useState({});

//   // Static list of doctors
//   const doctors = [
//     { id: 1, name: 'Dr. John Mayor', specialty: 'Pediatrics' },
//     { id: 2, name: 'Dr. Jane Smith', specialty: 'Cardiology' },
//     { id: 3, name: 'Dr. Mike Johnson', specialty: 'Dermatology' },
//   ];

//   // Fetch booked times from backend on mount
//   useEffect(() => {
//     const fetchBookedTimes = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/appointments/booked-times`);
//         setBookedTimes(response.data); // Expected format: { "2025-03-24": { "10:00 AM": "Dr. John Mayor" } }
//       } catch (error) {
//         console.error('Failed to fetch booked times:', error);
//         Alert.alert('Error', 'Unable to load booked times from the server.');
//       }
//     };

//     fetchBookedTimes();
//   }, []);
=======
const App = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [reviews, setReviews] = useState({});
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [patientId, setPatientId] = useState(null);
  const [page, setPage] = useState('home');
  const [bookedTimes, setBookedTimes] = useState({});

  const doctors = [
    { id: 1, name: 'Dr. John Mayor', specialty: 'Pediatrics' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Cardiology' },
    { id: 3, name: 'Dr. Mike Johnson', specialty: 'Dermatology' },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem('userData');
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          setPatientId(userData.id);
          setUserName(userData.name || 'Anonymous');
          console.log('Loaded user data:', userData);
        } else {
          Alert.alert('Warning', 'No user data found. Log in for full functionality.');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        Alert.alert('Error', 'Could not load user data.');
      }
    };

    const fetchBookedTimes = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/appointments/booked-times`);
        setBookedTimes(response.data || {});
      } catch (error) {
        console.error('Failed to fetch booked times:', error.response?.data || error.message);
      }
    };

    fetchUserData();
    fetchBookedTimes();
  }, []);
>>>>>>> 5ef2c003ad76758d9e2eb75629d3f5367abb6b06

//   const confirmAppointment = async () => {
//     if (!selectedDoctor || !selectedDate || !selectedTime) {
//       Alert.alert('Error', 'Please select a doctor, date, and time.');
//       return;
//     }

<<<<<<< HEAD
//     // Check if the time is already booked
//     if (bookedTimes[selectedDate] && bookedTimes[selectedDate][selectedTime]) {
//       Alert.alert('Error', 'This time is already booked. Please select another time.');
//       return;
//     }

//     // Send appointment data to backend
//     try {
//       const appointmentData = {
//         doctorId: selectedDoctor.id,
//         doctorName: selectedDoctor.name,
//         date: selectedDate,
//         time: selectedTime,
//         userName: userName || 'Anonymous', // Optional: Add user ID if authenticated
//       };

//       const response = await axios.post(`${backendUrl}/api/appointments`, appointmentData, {
//         timeout: 5000,
//       });

//       if (response.status === 201 || response.status === 200) {
//         setAppointmentConfirmed(true);
//         setBookedTimes((prevTimes) => ({
//           ...prevTimes,
//           [selectedDate]: { ...prevTimes[selectedDate], [selectedTime]: selectedDoctor.name },
//         }));
//         Alert.alert(
//           'Success',
//           `Appointment booked!\n\nDoctor: ${selectedDoctor.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`
//         );
//         setPage('doctorOptions'); // Return to doctor options
//       }
//     } catch (error) {
//       console.error('Booking failed:', {
//         message: error.message,
//         status: error.response?.status,
//         data: error.response?.data,
//       });
//       Alert.alert('Error', 'Failed to book appointment. Please try again.');
//     }
//   };

//   const submitReview = () => {
//     if (!reviewText || rating === 0) {
//       Alert.alert('Error', 'Please provide a review and a rating.');
//       return;
//     }
//     setReviews((prevReviews) => ({
//       ...prevReviews,
//       [selectedDoctor.name]: { reviewText, rating },
//     }));
//     setReviewText('');
//     setRating(0);
//     Alert.alert('Success', 'Review submitted!');
//   };

//   return (
//     <View style={styles.backgroundContainer}>
//       {page === 'home' ? (
//         <View style={styles.homeContainer}>
//           <Text style={styles.welcomeText}>Welcome to Doctor Booking</Text>
//           <Button title="Book an Appointment" onPress={() => setPage('doctorList')} />
//         </View>
//       ) : (
//         <ScrollView style={styles.fullPageContainer}>
//           {page === 'doctorList' ? (
//             <>
//               <Text style={styles.label}>Select a Doctor:</Text>
//               {doctors.map((doctor) => (
//                 <TouchableOpacity
//                   key={doctor.id}
//                   onPress={() => {
//                     setSelectedDoctor(doctor);
//                     setPage('doctorOptions');
//                   }}
//                   style={styles.dropdownItem}
//                 >
//                   <Text style={styles.doctorName}>{doctor.name}</Text>
//                   <Text style={styles.specialty}>{doctor.specialty}</Text>
//                 </TouchableOpacity>
//               ))}
//             </>
//           ) : page === 'doctorOptions' ? (
//             <>
//               <Text style={styles.sectionTitle}>{selectedDoctor.name}</Text>
//               <Text style={styles.specialty}>{selectedDoctor.specialty}</Text>
//               <Button title="Book Appointment" onPress={() => setPage('booking')} />
//               <View style={styles.buttonSpacing} />
//               <Button title="View Reviews" onPress={() => setPage('reviews')} />
//             </>
//           ) : page === 'booking' ? (
//             <>
//               <Text style={styles.sectionTitle}>Book an Appointment</Text>
//               <Calendar
//                 onDayPress={(day) => {
//                   setSelectedDate(day.dateString);
//                 }}
//                 markedDates={{
//                   [selectedDate]: {
//                     selected: true,
//                     selectedColor: 'blue',
//                     selectedTextColor: 'white',
//                   },
//                 }}
//               />
//               <Text style={styles.sectionTitle}>Select Time:</Text>
//               <Picker
//                 selectedValue={selectedTime}
//                 onValueChange={setSelectedTime}
//                 style={styles.picker}
//               >
//                 <Picker.Item label="Select Time" value="" />
//                 <Picker.Item label="10:00 AM" value="10:00 AM" />
//                 <Picker.Item label="11:00 AM" value="11:00 AM" />
//                 <Picker.Item label="1:00 PM" value="1:00 PM" />
//                 <Picker.Item label="3:00 PM" value="3:00 PM" />
//               </Picker>
//               {selectedTime && bookedTimes[selectedDate] && bookedTimes[selectedDate][selectedTime] ? (
//                 <Text style={styles.errorText}>This time is already booked. Please select another time.</Text>
//               ) : null}
//               <Button title="Confirm Appointment" onPress={confirmAppointment} />
//             </>
//           ) : page === 'reviews' ? (
//             <>
//               <Text style={styles.sectionTitle}>Reviews for {selectedDoctor.name}</Text>
//               {reviews[selectedDoctor.name] ? (
//                 <View style={styles.reviewContainer}>
//                   <Text style={styles.reviewText}>Review: {reviews[selectedDoctor.name].reviewText}</Text>
//                   <Text>Rating: {reviews[selectedDoctor.name].rating}</Text>
//                 </View>
//               ) : (
//                 <Text>No reviews available yet.</Text>
//               )}
//               <Text style={styles.sectionTitle}>Add a Review</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your name"
//                 value={userName}
//                 onChangeText={setUserName}
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your review"
//                 value={reviewText}
//                 onChangeText={setReviewText}
//                 multiline
//               />
//               <Rating
//                 showRating
//                 onFinishRating={setRating}
//                 style={styles.rating}
//                 startingValue={0}
//               />
//               <Button title="Submit Review" onPress={submitReview} />
//             </>
//           ) : null}
//         </ScrollView>
//       )}
//     </View>
//   );
// };
=======
    // Normalize time format (e.g., "10:00 AM" -> "10:00:00")
    let normalizedTime;
    try {
      normalizedTime = selectedTime
        .replace(' AM', ':00')
        .replace(' PM', ':00')
        .padEnd(8, ':00'); // Ensure "HH:MM:SS" format
    } catch (error) {
      console.error('Time normalization failed:', error);
      Alert.alert('Error', 'Invalid time format.');
      return;
    }

    if (bookedTimes[selectedDate]?.[normalizedTime]) {
      Alert.alert('Error', 'This time is already booked. Please select another time.');
      return;
    }

    const appointmentData = {
      parentId: patientId || null, // Allow null if not logged in
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: selectedDate, // "YYYY-MM-DD"
      time: normalizedTime, // "HH:MM:SS"
      status: 'Scheduled',
      parentName: userName || 'Anonymous',
    };

    try {
      console.log('Sending appointment data to backend:', JSON.stringify(appointmentData, null, 2));
      const response = await axios.post(`${backendUrl}/api/appointments`, appointmentData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
      });

      console.log('Booking response:', response.data);
      setAppointmentConfirmed(true);
      setBookedTimes((prev) => ({
        ...prev,
        [selectedDate]: { ...prev[selectedDate], [normalizedTime]: selectedDoctor.name },
      }));
      Alert.alert(
        'Success',
        `Appointment booked!\n\nDoctor: ${selectedDoctor.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`,
        [{ text: 'OK', onPress: () => setPage('doctorOptions') }]
      );
    } catch (error) {
      const errorDetails = {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      };
      console.error('Booking failed:', JSON.stringify(errorDetails, null, 2));
      Alert.alert(
        'Error',
        `Failed to book appointment: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const submitReview = async () => {
    if (!selectedDoctor) {
      Alert.alert('Error', 'Please select a doctor first.');
      return;
    }
    if (!reviewText || rating === 0) {
      Alert.alert('Error', 'Please provide a review and a rating.');
      return;
    }

    const reviewData = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      patientId: patientId || null,
      reviewText,
      rating,
      parentName: userName || 'Anonymous',
    };

    try {
      console.log('Posting review:', reviewData);
      const response = await axios.post(`${backendUrl}/api/reviews`, reviewData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
      });

      console.log('Response:', response.data);
      setReviews((prev) => ({
        ...prev,
        [selectedDoctor.name]: { reviewText, rating },
      }));
      setReviewText('');
      setRating(0);
      Alert.alert('Success', 'Review submitted successfully!');
    } catch (error) {
      console.error('Review submission failed:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      Alert.alert('Error', `Failed to submit review: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      {page === 'home' ? (
        <View style={styles.homeContainer}>
          <Text style={styles.welcomeText}>Welcome to Doctor Booking</Text>
          <Button title="Book an Appointment" onPress={() => setPage('doctorList')} />
        </View>
      ) : (
        <ScrollView style={styles.fullPageContainer}>
          {page === 'doctorList' ? (
            <>
              <Text style={styles.label}>Select a Doctor:</Text>
              {doctors.map((doctor) => (
                <TouchableOpacity
                  key={doctor.id}
                  onPress={() => {
                    setSelectedDoctor(doctor);
                    setPage('doctorOptions');
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.specialty}>{doctor.specialty}</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : page === 'doctorOptions' ? (
            <>
              <Text style={styles.sectionTitle}>{selectedDoctor?.name}</Text>
              <Text style={styles.specialty}>{selectedDoctor?.specialty}</Text>
              <Button title="Book Appointment" onPress={() => setPage('booking')} />
              <View style={styles.buttonSpacing} />
              <Button title="View Reviews" onPress={() => setPage('reviews')} />
            </>
          ) : page === 'booking' ? (
            <>
              <Text style={styles.sectionTitle}>Book an Appointment</Text>
              <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: 'blue', selectedTextColor: 'white' },
                }}
              />
              <Text style={styles.sectionTitle}>Select Time:</Text>
              <Picker
                selectedValue={selectedTime}
                onValueChange={setSelectedTime}
                style={styles.picker}
              >
                <Picker.Item label="Select Time" value="" />
                <Picker.Item label="10:00 AM" value="10:00 AM" />
                <Picker.Item label="11:00 AM" value="11:00 AM" />
                <Picker.Item label="1:00 PM" value="1:00 PM" />
                <Picker.Item label="3:00 PM" value="3:00 PM" />
              </Picker>
              {selectedTime && bookedTimes[selectedDate]?.[selectedTime.replace(' AM', ':00').replace(' PM', ':00')] && (
                <Text style={styles.errorText}>This time is already booked. Please select another time.</Text>
              )}
              <Button title="Confirm Appointment" onPress={confirmAppointment} />
            </>
          ) : page === 'reviews' ? (
            <>
              <Text style={styles.sectionTitle}>Reviews for {selectedDoctor?.name}</Text>
              {reviews[selectedDoctor?.name] ? (
                <View style={styles.reviewContainer}>
                  <Text style={styles.reviewText}>Review: {reviews[selectedDoctor.name].reviewText}</Text>
                  <Text>Rating: {reviews[selectedDoctor.name].rating}</Text>
                </View>
              ) : (
                <Text>No reviews available yet.</Text>
              )}
              <Text style={styles.sectionTitle}>Add a Review</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={userName}
                onChangeText={setUserName}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your review"
                value={reviewText}
                onChangeText={setReviewText}
                multiline
              />
              <Rating
                showRating
                onFinishRating={setRating}
                style={styles.rating}
                startingValue={rating}
              />
              <Button title="Submit Review" onPress={submitReview} />
            </>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
};
>>>>>>> 5ef2c003ad76758d9e2eb75629d3f5367abb6b06

// const styles = StyleSheet.create({
//   backgroundContainer: {
//     flex: 1,
//     backgroundColor: '#e0f7fa',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: width,
//     height: height,
//   },
//   fullPageContainer: {
//     width: '100%',
//     height: '100%',
//     padding: 20,
//     backgroundColor: '#ffffff',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   homeContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
//   welcomeText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   doctorName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   specialty: {
//     fontSize: 14,
//     color: 'gray',
//   },
//   dropdownItem: {
//     padding: 15,
//     backgroundColor: '#b2ebf2',
//     marginBottom: 5,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//     borderRadius: 5,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     marginBottom: 10,
//   },
//   rating: {
//     marginBottom: 20,
//   },
//   reviewContainer: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 5,
//   },
//   reviewText: {
//     fontWeight: 'bold',
//   },
//   buttonSpacing: {
//     marginVertical: 10,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
// });

// export default App;