import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated'; // Optional: for animations

const doctorsData = {
  "General Physician": [
    { id: '1', name: 'Dr. Smith', specialty: 'Internal Medicine', rating: 4.8 },
    { id: '2', name: 'Dr. Brown', specialty: 'Family Health', rating: 4.6 },
  ],
  "Pediatrician": [
    { id: '3', name: 'Dr. Adams', specialty: 'Child Care', rating: 4.9 },
    { id: '4', name: 'Dr. Garcia', specialty: 'Neonatology', rating: 4.7 },
  ],
  "Cardiologist": [
    { id: '5', name: 'Dr. Miller', specialty: 'Heart Surgery', rating: 4.9 },
    { id: '6', name: 'Dr. Wilson', specialty: 'Cardiac Imaging', rating: 4.5 },
  ],
  "Orthopedics": [
    { id: '7', name: 'Dr. Moore', specialty: 'Joint Replacement', rating: 4.8 },
    { id: '8', name: 'Dr. Taylor', specialty: 'Sports Injuries', rating: 4.7 },
  ],
  "Neurologist": [
    { id: '9', name: 'Dr. Lee', specialty: 'Stroke Care', rating: 4.9 },
    { id: '10', name: 'Dr. Martinez', specialty: 'Epilepsy', rating: 4.6 },
  ],
  "Dermatologist": [
    { id: '11', name: 'Dr. Clark', specialty: 'Skin Cancer', rating: 4.8 },
    { id: '12', name: 'Dr. Lewis', specialty: 'Cosmetic Derm', rating: 4.7 },
  ],
};

type DoctorCategory = keyof typeof doctorsData;

export default function DoctorCategory() {
  const { category } = useLocalSearchParams();
  const router = useRouter();

  const categoryTyped = category as DoctorCategory | undefined;

  if (!categoryTyped || !doctorsData[categoryTyped]) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Oops! No doctors found in this realm.</Text>
        <FontAwesome name="frown-o" size={50} color="#FF0000" style={styles.errorIcon} />
      </View>
    );
  }

  const doctors = doctorsData[categoryTyped];

  const handleDoctorPress = (doctorId: string) => {
    // Navigate to a doctor profile page (future implementation)
    console.log(`Exploring the expertise of Doctor ID: ${doctorId}`);
    // Example: router.push(`/doctorProfile?id=${doctorId}`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= Math.floor(rating) ? 'star' : 'star-o'}
          size={14}
          color="#FFD700"
          style={styles.star}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.duration(500)} style={styles.headerContainer}>
        <Text style={styles.header}>{categoryTyped} Experts</Text>
        <Text style={styles.subHeader}>Meet the masters of {categoryTyped.toLowerCase()} care!</Text>
      </Animated.View>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100).duration(400)}>
            <TouchableOpacity
              style={styles.doctorCard}
              onPress={() => handleDoctorPress(item.id)}
            >
              <View style={styles.avatarContainer}>
                <FontAwesome name="user-md" size={30} color="#2D4BC2" />
              </View>
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{item.name}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
                <View style={styles.ratingContainer}>
                  {renderStars(item.rating)}
                  <Text style={styles.ratingText}>({item.rating})</Text>
                </View>
              </View>
              <FontAwesome name="chevron-right" size={20} color="#2D4BC2" style={styles.arrow} />
            </TouchableOpacity>
          </Animated.View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D4BC2',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subHeader: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D4BC2',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  star: {
    marginRight: 3,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  arrow: {
    marginLeft: 10,
  },
  errorText: {
    fontSize: 20,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: 50,
    fontWeight: 'bold',
  },
  errorIcon: {
    marginTop: 20,
    alignSelf: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
});