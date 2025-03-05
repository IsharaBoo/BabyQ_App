import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router, useRouter } from 'expo-router';

export default function LandingPage2() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BabyQ</Text>

      <Text style={styles.description}>
        Quality care, expert advice, and a supportive community all in one place.
      </Text>

      <Text style={styles.subDescription}>
        "Our app connects moms to trusted doctors, tracks growth milestones, and digitizes health records."
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/registerSelect' as any)}>
        <Text style={styles.buttonText}>Create an account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/login' as any)}>
        <Text style={styles.buttonText}>Login</Text>
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
  fontSize: 32,
  fontWeight: 'bold',
  color: '#2D4BC2',
  marginBottom: 20,
  marginTop: -80,
  textAlign: 'left', // Align text to the left
  alignSelf: 'flex-start', 
},
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  subDescription: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
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