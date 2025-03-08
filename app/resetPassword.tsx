import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define the navigation types
type RootStackParamList = {
  ResetPW: undefined;
};

export default function ResetPasswordScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>(''); // Explicit type annotation

  const handleReset = (): void => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    navigation.navigate('ResetPW');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#2D4BC2" />
      </TouchableOpacity>

      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.description}>
        Enter the email address you used when you signed up for your account, and we will email a link to reset your password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email address"
        placeholderTextColor="#A9A9A9"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButtonSecondary} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D4BC2',
    textAlign: 'left',
    marginLeft: 45,
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginTop: 40,
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 40,
  },
  resetButton: {
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#2D4BC2',
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 5,
    marginLeft: 20,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  backButtonSecondary: {
    width: '90%',
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: '#A9B8E8',
    paddingVertical: 12,
    alignItems: 'center',
    marginLeft: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

