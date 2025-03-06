import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated'; // Optional: for animations

// Unified doctors data (flattened from previous structure)
const doctorsData = [
  { id: '1', name: 'Dr. Smith', specialty: 'Internal Medicine', category: 'General Physician', rating: 4.8 },
  { id: '2', name: 'Dr. Brown', specialty: 'Family Health', category: 'General Physician', rating: 4.6 },
  { id: '3', name: 'Dr. Adams', specialty: 'Child Care', category: 'Pediatrician', rating: 4.9 },
  { id: '4', name: 'Dr. Garcia', specialty: 'Neonatology', category: 'Pediatrician', rating: 4.7 },
  { id: '5', name: 'Dr. Miller', specialty: 'Heart Surgery', category: 'Cardiologist', rating: 4.9 },
  { id: '6', name: 'Dr. Wilson', specialty: 'Cardiac Imaging', category: 'Cardiologist', rating: 4.5 },
  { id: '7', name: 'Dr. Moore', specialty: 'Joint Replacement', category: 'Orthopedics', rating: 4.8 },
  { id: '8', name: 'Dr. Taylor', specialty: 'Sports Injuries', category: 'Orthopedics', rating: 4.7 },
  { id: '9', name: 'Dr. Lee', specialty: 'Stroke Care', category: 'Neurologist', rating: 4.9 },
  { id: '10', name: 'Dr. Martinez', specialty: 'Epilepsy', category: 'Neurologist', rating: 4.6 },
  { id: '11', name: 'Dr. Clark', specialty: 'Skin Cancer', category: 'Dermatologist', rating: 4.8 },
  { id: '12', name: 'Dr. Lewis', specialty: 'Cosmetic Derm', category: 'Dermatologist', rating: 4.7 },
];

const DoctorSearchResults = () => {
  const { query } = useLocalSearchParams();
  const router = useRouter();

  const searchQuery = (query as string)?.toLowerCase() || '';
  const filteredDoctors = doctorsData.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery) ||
      doctor.specialty.toLowerCase().includes(searchQuery) ||
      doctor.category.toLowerCase().includes(searchQuery)
  );

  const handleDoctorPress = (doctorId: string) => {
    // Navigate to doctor profile (future implementation)
    console.log(`Selected doctor ID: ${doctorId}`);
    
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
        <Text style={styles.header}>Search Results for "{query}"</Text>
        <Text style={styles.subHeader}>
          {filteredDoctors.length > 0
            ? `Found ${filteredDoctors.length} healing heroes!`
            : 'No healers match your quest.'}
        </Text>
      </Animated.View>

      {filteredDoctors.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <FontAwesome name="search" size={50} color="#666" style={styles.noResultsIcon} />
          <Text style={styles.noResultsText}>No doctors found. Try a different spell!</Text>
        </View>
      ) : (
        <FlatList
          data={filteredDoctors}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D4BC2',
    textTransform: 'capitalize',
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsIcon: {
    marginBottom: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default DoctorSearchResults;