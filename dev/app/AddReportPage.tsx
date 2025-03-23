// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
// import { PDFDocument, rgb } from 'react-native-pdf-lib'; // Import PDF library

// // Define the type for the props with pdfPath
// type AddReportPageProps = {
//   onSubmit: (data: { title: string; description: string; date: string; pdfPath: string }) => void;
// };

// const AddReportPage = ({ onSubmit }: AddReportPageProps) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');

//   const handleSubmit = async () => {
//     if (!title || !description || !date) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     // Create PDF report
//     const pdfPath = await createPdfReport(title, description, date);

//     // Call the onSubmit function passed as a prop (including the path to the PDF)
//     onSubmit({ title, description, date, pdfPath });
//     Alert.alert('Success', 'Report added!');
//   };

//   const createPdfReport = async (title: string, description: string, date: string) => {
//     const doc = await PDFDocument.create();

//     // Add a page to the PDF document
//     const page = doc.addPage([600, 800]);

//     // Draw text on the page (title, description, and date)
//     page.drawText(`Report Title: ${title}`, { x: 30, y: 750, fontSize: 18 });
//     page.drawText(`Description: ${description}`, { x: 30, y: 730, fontSize: 16 });
//     page.drawText(`Date: ${date}`, { x: 30, y: 710, fontSize: 14 });

//     // Save the PDF and return the file path
//     const pdfPath = await doc.write();
//     return pdfPath;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add Report</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Report Title"
//         value={title}
//         onChangeText={setTitle}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Report Description"
//         value={description}
//         onChangeText={setDescription}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Date (YYYY-MM-DD)"
//         value={date}
//         onChangeText={setDate}
//       />

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingLeft: 10,
//     fontSize: 16,
//     borderRadius: 5,
//   },
// });

// export default AddReportPage;

















// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// type AddReportPageProps = {
//   onSubmit: (newReport: { title: string; description: string; date: string; pdfPath: string }) => void;
// };

// const AddReportPage = ({ onSubmit }: AddReportPageProps) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [date, setDate] = useState('');
//   const [pdfPath, setPdfPath] = useState('');

//   const handleSubmit = () => {
//     if (title && description && date && pdfPath) {
//       onSubmit({ title, description, date, pdfPath });
//       setTitle('');
//       setDescription('');
//       setDate('');
//       setPdfPath('');
//     } else {
//       alert('Please fill out all fields.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Add a New Report</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={title}
//         onChangeText={setTitle}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Date (YYYY-MM-DD)"
//         value={date}
//         onChangeText={setDate}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="PDF Path"
//         value={pdfPath}
//         onChangeText={setPdfPath}
//       />
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//   },
// });

// export default AddReportPage;
















// // AddReportPage.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import DocumentPicker, {
//   DocumentPickerResponse,
//   types,
// } from 'react-native-document-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// interface Report {
//   title: string;
//   date: Date;
//   file: DocumentPickerResponse | null;
// }

// const AddReportPage = ({ navigation, route }: any) => {
//   const [title, setTitle] = useState('');
//   const [date, setDate] = useState(new Date());
//   const [file, setFile] = useState<DocumentPickerResponse | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleChooseFile = async () => {
//     try {
//       const res = await DocumentPicker.pick({
//         type: [types.pdf, types.images],
//       });
//       if (Array.isArray(res)) {
//         setFile(res[0]); // Access the first element
//       } else {
//         setFile(res);
//       }
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User cancelled the picker, exit any further actions
//       } else {
//         throw err;
//       }
//     }
//   };

//   const handleAddReport = () => {
//     if (title && date && file) {
//       const newReport: Report = {
//         title,
//         date,
//         file,
//       };

//       const reports = route.params?.reports || [];
//       navigation.navigate('ViewReports', {
//         reports: [...reports, newReport],
//       });
//     } else {
//       alert('Please fill in all fields and select a file.');
//     }
//   };

//   const onChangeDate = (event: any, selectedDate: Date | undefined) => {
//     const currentDate = selectedDate || date;
//     setShowDatePicker(Platform.OS === 'ios');
//     setDate(currentDate);
//   };

//   const showDatepicker = () => {
//     setShowDatePicker(true);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.label}>Report Title:</Text>
//       <TextInput
//         style={styles.input}
//         value={title}
//         onChangeText={setTitle}
//         placeholder="Enter report title"
//       />

//       <Text style={styles.label}>Report Date:</Text>
//       <TouchableOpacity onPress={showDatepicker}>
//         <View style={styles.datePickerButton}>
//           <Text>{date.toLocaleDateString()}</Text>
//         </View>
//       </TouchableOpacity>

//       {showDatePicker && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={'date'}
//           is24Hour={true}
//           display="default"
//           onChange={onChangeDate}
//         />
//       )}

//       <Text style={styles.label}>Choose File:</Text>
//       <TouchableOpacity style={styles.fileButton} onPress={handleChooseFile}>
//         <Text>{file ? file.name : 'Select PDF or Image'}</Text>
//       </TouchableOpacity>

//       <Button title="Add Report" onPress={handleAddReport} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 15,
//   },
//   fileButton: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 15,
//     alignItems: 'center',
//   },
//   datePickerButton: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 15,
//     alignItems: 'center',
//   },
// });

// export default AddReportPage;























// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

// type ReportFile = {
//   uri?: string;
//   name: string;
//   type?: string;
//   downloadUrl?: string;
// };

// type AddReportPageProps = {
//   onSubmit: (data: {
//     reportName: string;
//     date: string;
//     description: string;
//     fileName?: string; // Changed to fileName for simplicity
//   }) => void;
// };

// const AddReportPage = ({ onSubmit }: AddReportPageProps) => {
//   const [reportName, setReportName] = useState('');
//   const [date, setDate] = useState('');
//   const [description, setDescription] = useState('');
//   const [fileName, setFileName] = useState('');

//   const handleSubmit = () => {
//     if (!reportName || !date || !description) {
//       Alert.alert('Error', 'Please fill all required fields (Report Name, Date, Description)');
//       return;
//     }

//     const newReport = {
//       reportName,
//       date,
//       description,
//       fileName: fileName || undefined, // Only include if provided
//     };

//     onSubmit(newReport);
//     setReportName('');
//     setDate('');
//     setDescription('');
//     setFileName('');
//     console.log('Submitted report:', newReport);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add New Report</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Report Name *"
//         value={reportName}
//         onChangeText={setReportName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Date (YYYY-MM-DD) *"
//         value={date}
//         onChangeText={setDate}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Description *"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//         numberOfLines={4}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="File Name (optional)"
//         value={fileName}
//         onChangeText={setFileName}
//       />

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingLeft: 10,
//     fontSize: 16,
//     borderRadius: 5,
//   },
// });

// export default AddReportPage;











// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';

// type AddReportPageProps = {
//   onSubmit: (data: {
//     reportName: string;
//     date: string;
//     description: string;
//     filePath?: string;
//     fileName?: string;
//   }) => void;
// };

// const AddReportPage = ({ onSubmit }: AddReportPageProps) => {
//   const [reportName, setReportName] = useState('');
//   const [date, setDate] = useState('');
//   const [description, setDescription] = useState('');
//   const [fileName, setFileName] = useState('');
//   const [filePath, setFilePath] = useState('');

//   const handleFilePick = async () => {
//     try {
//       const result = await DocumentPicker.pick({
//         type: [DocumentPicker.types.allFiles],
//       });
//       if (result) {
//         const file = result[0];
//         const fileName = file.name ?? 'Unnamed File';
//         const destinationPath = `${RNFS.DocumentDirectoryPath}/reports/${fileName}-${Date.now()}`;

//         await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/reports`);
//         await RNFS.copyFile(file.uri, destinationPath);
//         console.log('File copied to:', destinationPath);

//         setFileName(fileName);
//         setFilePath(destinationPath);
//         Alert.alert('Success', `File selected: ${fileName}`);
//       }
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log('User cancelled file picker');
//       } else {
//         console.error('File picker error:', err);
//         Alert.alert('Error', 'Failed to pick file');
//       }
//     }
//   };

//   const handleSubmit = () => {
//     if (!reportName || !date || !description) {
//       Alert.alert('Error', 'Please fill all required fields (Report Name, Date, Description)');
//       return;
//     }

//     const newReport = {
//       reportName,
//       date,
//       description,
//       filePath: filePath || undefined,
//       fileName: fileName || undefined,
//     };

//     onSubmit(newReport);
//     setReportName('');
//     setDate('');
//     setDescription('');
//     setFileName('');
//     setFilePath('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Add New Report</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Report Name *"
//         value={reportName}
//         onChangeText={setReportName}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Date (YYYY-MM-DD) *"
//         value={date}
//         onChangeText={setDate}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Description *"
//         value={description}
//         onChangeText={setDescription}
//         multiline
//         numberOfLines={4}
//       />

//       <Button title="Pick File" onPress={handleFilePick} />
//       {fileName && (
//         <Text style={styles.fileInfo}>Selected File: {fileName}</Text>
//       )}

//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingLeft: 10,
//     fontSize: 16,
//     borderRadius: 5,
//   },
//   fileInfo: {
//     marginTop: 10,
//     marginBottom: 15,
//     color: '#555',
//   },
// });

// export default AddReportPage;








import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

type AddReportPageProps = {
  onSubmit: (data: { reportName: string; date: string; description: string }) => void;
};

const AddReportPage = ({ onSubmit }: AddReportPageProps) => {
  const [reportName, setReportName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!reportName || !date || !description) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const newReport = {
      reportName,
      date,
      description,
    };

    onSubmit(newReport);
    // Reset form
    setReportName('');
    setDate('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Report</Text>

      <TextInput
        style={styles.input}
        placeholder="Report Name"
        value={reportName}
        onChangeText={setReportName}
      />

      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
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