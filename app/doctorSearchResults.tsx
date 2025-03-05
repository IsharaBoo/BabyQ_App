import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

const doctors = [
  { id: '1', name: 'Dr. John Doe', specialty: 'Pediatrician' },
  { id: '2', name: 'Dr. Jane Smith', specialty: 'Dermatologist' },
  { id: '3', name: 'Dr. Alice Johnson', specialty: 'General Practitioner' },
];

const DoctorSearchResults = () => {
  const { query } = useLocalSearchParams();
  const router = useRouter();

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes((query as string).toLowerCase()) ||
      doctor.specialty.toLowerCase().includes((query as string).toLowerCase())
  );

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Search Results for "{query}"</Text>
      {filteredDoctors.length === 0 ? (
        <Text>No doctors found.</Text>
      ) : (
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="p-4 mb-2 bg-gray-100 rounded-lg"
              onPress={() => router.push(`/doctor/${item.id}` as any)}
            >
              <Text className="text-lg font-semibold">{item.name}</Text>
              <Text>{item.specialty}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default DoctorSearchResults;
