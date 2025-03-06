import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

export default function HealthcareProviderRegistration3() {
  const router = useRouter();
  const [fileName, setFileName] = useState<string | null>(null); // Define state for file name

  const handleContinue = () => {
    router.push('/healthcareProvider4'); // Navigate to the next page
  };

  const handleGoBack = () => {
    router.back(); // Navigate back to the previous screen
  };

  const handleUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/png'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setFileName(file.name); // Store file name in state
        console.log('Selected file:', file);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={24} color="#2D4BC2" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Finish up!</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.completed]} />
        <View style={[styles.progressDot, styles.active]} />
        <View style={styles.progressDot} />
      </View>

      {/* Instructions */}
      <Text style={styles.instructions}>
        Please upload a document proving your affiliation with your hospital or clinic (e.g., recent pay stub, employment letter, or hospital ID)
      </Text>

      {/* Upload Button with PDF Icon */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload} activeOpacity={0.8}>
  <Ionicons name="document-attach-outline" size={35} color="#2D4BC2" />
  <Ionicons name="add-circle" size={20} color="#2D4BC2" style={styles.plusIcon} />
</TouchableOpacity>


      {/* Display Selected File Name */}
      {fileName ? (
        <Text style={styles.fileName}>{fileName}</Text>
      ) : (
        <Text style={styles.fileFormats}>PDF, JPG, PNG</Text>
      )}

      {/* Finish Button */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Finish</Text>
      </TouchableOpacity>

      {/* Decorative Dots */}
      <View style={styles.decorativeDots}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#2D4BC2',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  completed: {
    backgroundColor: '#2D4BC2',
  },
  active: {
    backgroundColor: '#FFA500',
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    paddingHorizontal: 10,
  },
  uploadButton: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  fileName: {
    fontSize: 14,
    color: '#2D4BC2',
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: '600',
  },
  fileFormats: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 40,
  },
  button: {
    width: '90%',
    backgroundColor: '#2D4BC2',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  decorativeDots: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6F91',
    opacity: 0.6,
  },
  plusIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
  }
  
});

