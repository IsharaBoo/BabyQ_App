import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { PDFDocument, rgb } from 'react-native-pdf-lib'; // Import PDF library

// Define the type for the props with pdfPath
type AddReportPageProps = {
  onSubmit: (data: { title: string; description: string; date: string; pdfPath: string }) => void;
};

const AddReportPage = ({ onSubmit }: AddReportPageProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    if (!title || !description || !date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Create PDF report
    const pdfPath = await createPdfReport(title, description, date);

    // Call the onSubmit function passed as a prop (including the path to the PDF)
    onSubmit({ title, description, date, pdfPath });
    Alert.alert('Success', 'Report added!');
  };

  const createPdfReport = async (title: string, description: string, date: string) => {
    const doc = await PDFDocument.create();

    // Add a page to the PDF document
    const page = doc.addPage([600, 800]);

    // Draw text on the page (title, description, and date)
    page.drawText(`Report Title: ${title}`, { x: 30, y: 750, fontSize: 18 });
    page.drawText(`Description: ${description}`, { x: 30, y: 730, fontSize: 16 });
    page.drawText(`Date: ${date}`, { x: 30, y: 710, fontSize: 14 });

    // Save the PDF and return the file path
    const pdfPath = await doc.write();
    return pdfPath;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Report</Text>

      <TextInput
        style={styles.input}
        placeholder="Report Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Report Description"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5,
  },
});

export default AddReportPage;


