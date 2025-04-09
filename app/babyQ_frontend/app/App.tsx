import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, ScrollView, Button, TouchableOpacity, 
  TextInput, Dimensions
} from 'react-native';
import { Rating } from 'react-native-elements';
import { Calendar } from 'react-native-calendars'; 
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [reviews, setReviews] = useState({});
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState('');
  const [page, setPage] = useState('home');
  const [bookedTimes, setBookedTimes] = useState({});

  const doctors = [
    { name: 'Dr. John Mayor', specialty: 'Pediatrics' },
    { name: 'Dr. Jane Smith', specialty: 'Cardiology' },
    { name: 'Dr. Mike Johnson', specialty: 'Dermatology' }
  ];

  const confirmAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('Please select a doctor, date, and time.');
      return;
    }

    // Check if the time has already been booked
    if (bookedTimes[selectedDate] && bookedTimes[selectedDate][selectedTime]) {
      alert('This time is already booked. Please select another time.');
      return;
    }

    // Confirm the appointment
    setAppointmentConfirmed(true);
    setBookedTimes(prevTimes => ({
      ...prevTimes,
      [selectedDate]: { ...prevTimes[selectedDate], [selectedTime]: selectedDoctor.name }
    }));

    alert(`Appointment successfully booked!\n\nDoctor: ${selectedDoctor.name}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
    setPage('doctorOptions');  // Stay on doctor options page after appointment confirmation
  };

  const submitReview = () => {
    if (!reviewText || rating === 0) {
      alert('Please provide a review and a rating.');
      return;
    }
    setReviews(prevReviews => ({
      ...prevReviews,
      [selectedDoctor.name]: { reviewText, rating }
    }));
    setReviewText('');
    setRating(0);
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
              {doctors.map((doctor, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => { setSelectedDoctor(doctor); setPage('doctorOptions'); }} 
                  style={styles.dropdownItem}
                >
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.specialty}>{doctor.specialty}</Text>
                </TouchableOpacity>
              ))}
            </>
          ) : page === 'doctorOptions' ? (
            <>
              <Text style={styles.sectionTitle}>{selectedDoctor.name}</Text>
              <Text style={styles.specialty}>{selectedDoctor.specialty}</Text>
              <Button title="Book Appointment" onPress={() => setPage('booking')} />
              <View style={styles.buttonSpacing} />
              <Button title="View Reviews" onPress={() => setPage('reviews')} />
            </>
          ) : page === 'booking' ? (
            <>
              <Text style={styles.sectionTitle}>Book an Appointment</Text>
              <Calendar
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                }}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: 'blue',
                    selectedTextColor: 'white',
                  },
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
              {selectedTime && bookedTimes[selectedDate] && bookedTimes[selectedDate][selectedTime] ? (
                <Text style={styles.errorText}>This time is already booked. Please select another time.</Text>
              ) : null}
              <Button title="Confirm Appointment" onPress={confirmAppointment} />
            </>
          ) : page === 'reviews' ? (
            <>
              <Text style={styles.sectionTitle}>Reviews for {selectedDoctor.name}</Text>
              {reviews[selectedDoctor.name] ? (
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
                startingValue={0}  // Ensures no star is selected by default
              />
              <Button title="Submit Review" onPress={submitReview} />
            </>
          ) : null}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  fullPageContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  specialty: {
    fontSize: 14,
    color: 'gray'
  },
  dropdownItem: {
    padding: 15,
    backgroundColor: '#b2ebf2',
    marginBottom: 5,
    borderRadius: 10,
    alignItems: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  rating: {
    marginBottom: 20,
  },
  reviewContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  reviewText: {
    fontWeight: 'bold',
  },
  buttonSpacing: {
    marginVertical: 10,  // Adds space between the buttons
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default App;
