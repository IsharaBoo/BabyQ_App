import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button, Modal, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Rating } from 'react-native-elements';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [times] = useState(['10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM']);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);
  const [doctorInfoVisible, setDoctorInfoVisible] = useState(false);

  const doctors = [
    'Dr. John Mayor - Pediatrics',
    'Dr. Jane Smith - Cardiology',
    'Dr. Mike Johnson - Dermatology'
  ];

  const confirmAppointment = () => {
    setAppointmentConfirmed(true);
    setModalVisible(false);
    alert(`Appointment successfully booked!\n\nDoctor: ${selectedDoctor}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
  };

  return (
    <ImageBackground source={{ uri: 'https://example.com/your-background-image.jpg' }} style={styles.backgroundImage}>
      {!doctorInfoVisible ? (
        <View style={styles.overlayContainer}>
          <Button title="Book an appointment" onPress={() => setDoctorInfoVisible(true)} />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.dropdown}>
            {doctors.map((doctor, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedDoctor(doctor)} style={styles.dropdownItem}>
                <Text>{doctor}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {selectedDoctor && (
            <>
              <Header setModalVisible={setModalVisible} selectedDoctor={selectedDoctor} />
              <Statistics />
              <About />
              <ReviewSummary />
              <ShareYourExperience />
              <Text style={styles.label}>Select a date:</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={selectedDate}
                onChangeText={setSelectedDate}
              />
              <Text style={styles.label}>Select a time:</Text>
              <View style={styles.dropdown}>
                {times.map((time, index) => (
                  <TouchableOpacity key={index} onPress={() => setSelectedTime(time)} style={styles.dropdownItem}>
                    <Text>{time}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Button title="Confirm Appointment" onPress={confirmAppointment} />
              {appointmentConfirmed && (
                <View style={styles.confirmation}>
                  <Text>Appointment Confirmed!</Text>
                  <Text>Doctor: {selectedDoctor}</Text>
                  <Text>Date: {selectedDate}</Text>
                  <Text>Time: {selectedTime}</Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
      )}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book an Appointment</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModal}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const Header = ({ setModalVisible, selectedDoctor }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{selectedDoctor}</Text>
    <Text style={styles.subtitle}>St. Sebastian Children's Hospital</Text>
    <Button title="Book an appointment" onPress={() => setModalVisible(true)} />
  </View>
);

const Statistics = () => (
  <View style={styles.statistics}>
    <Text>Statistics Component</Text>
  </View>
);

const About = () => (
  <View style={styles.about}>
    <Text>About Component</Text>
  </View>
);

const ReviewSummary = () => (
  <View style={styles.reviewSummary}>
    <Text>ReviewSummary Component</Text>
  </View>
);

const ShareYourExperience = () => (
  <View style={styles.shareYourExperience}>
    <Text>ShareYourExperience Component</Text>
  </View>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: 20
  },
  dropdown: {
    marginBottom: 20
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 5
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10
  },
  confirmation: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#dff0d8'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  closeModal: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 18,
    color: '#555'
  },
  statistics: {
    marginBottom: 20
  },
  about: {
    marginBottom: 20
  },
  reviewSummary: {
    marginBottom: 20
  },
  shareYourExperience: {
    marginBottom: 20
  }
});

export default App;
