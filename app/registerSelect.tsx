import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function RegistrationSelectPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who are you signing up as?</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('parent1' as any)}>
        <Text style={styles.buttonText}>Parent/Guardian</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/healthcareProvider1' as any)}>
        <Text style={styles.buttonText}>Healthcare Provider</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A2E',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});