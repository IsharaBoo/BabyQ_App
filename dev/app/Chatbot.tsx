// // import React, { useState } from "react";
// // import { View, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
// // import { TextInput, Button, Card, Title, Paragraph, ActivityIndicator } from "react-native-paper";
// // import LinearGradient from "react-native-linear-gradient";
// // import LottieView from "lottie-react-native";
// // import axios from "axios";

// // const AllergyPrediction = () => {
// //   const [symptoms, setSymptoms] = useState({
// //     sneezing: "",
// //     runny_nose: "",
// //     itchy_eyes: "",
// //     skin_rash: "",
// //   });
// //   const [loading, setLoading] = useState(false);
// //   const [result, setResult] = useState(null);
// //   const [focusedInput, setFocusedInput] = useState(null);

// //   const handleInputChange = (key: string, value: string) => {
// //     setSymptoms({ ...symptoms, [key]: value });
// //   };

// //   const handleFocus = (input) => {
// //     setFocusedInput(input);
// //   };

// //   const handleBlur = () => {
// //     setFocusedInput(null);
// //   };

// //   const handlePredict = async () => {
// //     setLoading(true);
// //     setResult(null);

// //     try {
// //       const response = await axios.post("http://10.0.2.2:5000/predict", {
// //         sneezing: parseInt(symptoms.sneezing),
// //         runny_nose: parseInt(symptoms.runny_nose),
// //         itchy_eyes: parseInt(symptoms.itchy_eyes),
// //         skin_rash: parseInt(symptoms.skin_rash),
// //       });

// //       setResult(response.data.prediction);
// //     } catch (error) {
// //       Alert.alert("Error", "Failed to fetch prediction. Check server connection.");
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <LinearGradient colors={["#8EC5FC", "#E0C3FC"]} style={{ flex: 1 }}>
// //       <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
// //         <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>
// //           <Card style={styles.card}>
// //             <Title style={styles.title}>🌿 Allergy Prediction</Title>
// //             <Paragraph style={{...styles.description, fontStyle: "italic"}}>
// //               Enter symptoms (0 for No, 1 for Yes)
// //             </Paragraph>

// //             <TextInput
// //               label="Sneezing (0 or 1)"
// //               mode="outlined"
// //               keyboardType="numeric"
// //               style={[
// //                 styles.input,
// //                 focusedInput === "sneezing" && styles.focusedInput
// //               ]}
// //               onChangeText={(text) => handleInputChange("sneezing", text)}
// //               onFocus={() => handleFocus("sneezing")}
// //               onBlur={handleBlur}
// //             />
// //             <TextInput
// //               label="Runny Nose (0 or 1)"
// //               mode="outlined"
// //               keyboardType="numeric"
// //               style={[
// //                 styles.input,
// //                 focusedInput === "runny_nose" && styles.focusedInput
// //               ]}
// //               onChangeText={(text) => handleInputChange("runny_nose", text)}
// //               onFocus={() => handleFocus("runny_nose")}
// //               onBlur={handleBlur}
// //             />
// //             <TextInput
// //               label="Itchy Eyes (0 or 1)"
// //               mode="outlined"
// //               keyboardType="numeric"
// //               style={[
// //                 styles.input,
// //                 focusedInput === "itchy_eyes" && styles.focusedInput
// //               ]}
// //               onChangeText={(text) => handleInputChange("itchy_eyes", text)}
// //               onFocus={() => handleFocus("itchy_eyes")}
// //               onBlur={handleBlur}
// //             />
// //             <TextInput
// //               label="Skin Rash (0 or 1)"
// //               mode="outlined"
// //               keyboardType="numeric"
// //               style={[
// //                 styles.input,
// //                 focusedInput === "skin_rash" && styles.focusedInput
// //               ]}
// //               onChangeText={(text) => handleInputChange("skin_rash", text)}
// //               onFocus={() => handleFocus("skin_rash")}
// //               onBlur={handleBlur}
// //             />

// //             {loading ? (
// //               <LottieView
// //                 source={require("./assets/loading.json")}
// //                 autoPlay
// //                 loop
// //                 style={styles.lottie}
// //               />
// //             ) : (
// //               <Button mode="contained" style={styles.button} onPress={handlePredict}>
// //                 Predict Allergy
// //               </Button>
// //             )}

// //             {result && (
// //               <Card style={styles.resultCard}>
// //                 <Title style={styles.resultTitle}>Result 🎯</Title>
// //                 <Paragraph style={styles.resultText}>{result}</Paragraph>
// //               </Card>
// //             )}
// //           </Card>
// //         </ScrollView>
// //       </KeyboardAvoidingView>
// //     </LinearGradient>
// //   );
// // };

// // import { StyleSheet } from "react-native";

// // const styles = StyleSheet.create({
// //   card: {
// //     padding: 20,
// //     borderRadius: 20,
// //     backgroundColor: "rgba(255, 255, 255, 0.85)",
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 6 },
// //     shadowOpacity: 0.4,
// //     shadowRadius: 10,
// //     elevation: 12,
// //   title: {
// //     textAlign: "center",
// //     fontSize: 28,
// //     fontWeight: "700",
// //     marginBottom: 10,
// //     color: "#3f51b5",
// //     fontFamily: "Arial, sans-serif",
// //   },
// //     fontFamily: "Arial, sans-serif",
// //   },
// //   description: {
// //     textAlign: "center",
// //     fontSize: 18,
// //     marginBottom: 20,
// //     color: "#555",
// //     fontStyle: "italic",
// //     fontFamily: "Arial, sans-serif",
// //   },
// //   input: {
// //     marginBottom: 15,
// //     backgroundColor: "#fff",
// //     borderRadius: 15,
// //     paddingLeft: 12,
// //     borderColor: "#3f51b5",
// //     borderWidth: 1.5,
// //     fontSize: 16,
// //     fontFamily: "Arial, sans-serif",
// //   },
// //   focusedInput: {
// //     borderColor: "#6200ea",
// //     shadowColor: "#6200ea",
// //     shadowOffset: { width: 0, height: 3 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 5,
// //   },
// //   button: {
// //     marginTop: 20,
// //     backgroundColor: "#3f51b5",
// //     paddingVertical: 12,
// //     borderRadius: 15,
// //     shadowColor: "#3f51b5",
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 6,
// //     elevation: 6,
// //     background: "linear-gradient(to right, #6200ea, #3f51b5)",
// //   },
// //   lottie: {
// //     width: 120,
// //     height: 120,
// //     alignSelf: 'center' as 'center',
// //   },
// //   resultCard: {
// //     marginTop: 30,
// //     padding: 15,
// //     backgroundColor: "#d4edda",
// //     borderRadius: 15,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 4 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 8,
// //     elevation: 6,
// //   },
// //   resultTitle: {
// //     textAlign: "center" as "center",
// //     fontSize: 20,
// //     fontWeight: "600" as "600",
// //     color: "#155724",
// //     fontFamily: "Arial, sans-serif",
// //   },
// //   resultText: {
// //     textAlign: "center" as "center",
// //     fontSize: 18,
// //     color: "#155724",
// //     fontFamily: "Arial, sans-serif",
// //   },
// // };

// // export default AllergyPrediction;










import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, CircularProgress, Card, Alert } from '@mui/material';

const App = () => {
  const [symptoms, setSymptoms] = useState({
    sneezing: '',
    runny_nose: '',
    itchy_eyes: '',
    skin_rash: '',
  });
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSymptoms({ ...symptoms, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setPrediction('');

    try {
      const response = await axios.post('http://localhost:5000/predict', symptoms, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 50 }}>
      <Card style={{ padding: 20, borderRadius: 10, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Allergy Prediction
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          Enter symptoms to predict if there is an allergy. Use "1" for Yes and "0" for No.
        </Typography>

        <TextField
          label="Sneezing (0 or 1)"
          variant="outlined"
          fullWidth
          name="sneezing"
          value={symptoms.sneezing}
          onChange={handleChange}
          style={{ marginBottom: 15 }}
        />
        <TextField
          label="Runny Nose (0 or 1)"
          variant="outlined"
          fullWidth
          name="runny_nose"
          value={symptoms.runny_nose}
          onChange={handleChange}
          style={{ marginBottom: 15 }}
        />
        <TextField
          label="Itchy Eyes (0 or 1)"
          variant="outlined"
          fullWidth
          name="itchy_eyes"
          value={symptoms.itchy_eyes}
          onChange={handleChange}
          style={{ marginBottom: 15 }}
        />
        <TextField
          label="Skin Rash (0 or 1)"
          variant="outlined"
          fullWidth
          name="skin_rash"
          value={symptoms.skin_rash}
          onChange={handleChange}
          style={{ marginBottom: 15 }}
        />

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
            Predict Allergy
          </Button>
        )}

        {prediction && (
          <Alert severity={prediction === 'Allergy Detected' ? 'warning' : 'success'} style={{ marginTop: 20 }}>
            {prediction}
          </Alert>
        )}

        {error && (
          <Alert severity="error" style={{ marginTop: 20 }}>
            {error}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default App;






























// // React Native (Frontend) - AllergyPrediction.tsx

// import React, { useState } from "react";
// import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
// import axios from "axios";
// import { Picker } from "@react-native-picker/picker";

// interface FormData {
//   GENDER_FACTOR: string;
//   RACE_FACTOR: string;
//   ETHNICITY_FACTOR: string;
//   ATOPIC_MARCH_COHORT: string;
//   ATOPIC_DERM_START: string;
//   ALLERGIC_RHINITIS_START: string;
//   ASTHMA_START: string;
// }

// const AllergyPrediction = () => {
//   const [formData, setFormData] = useState<FormData>({
//     GENDER_FACTOR: "",
//     RACE_FACTOR: "",
//     ETHNICITY_FACTOR: "",
//     ATOPIC_MARCH_COHORT: "",
//     ATOPIC_DERM_START: "2023-01-01",
//     ALLERGIC_RHINITIS_START: "2023-01-01",
//     ASTHMA_START: "2023-01-01",
//   });

//   const [predictions, setPredictions] = useState<string[]>([]);

//   const handleChange = (name: keyof FormData, value: string) => {
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     console.log("Sending data:", formData);
//     try {
//       const response = await axios.post("http://127.0.0.1:5000/predict", formData);
//       console.log("Response:", response.data);
//       setPredictions(response.data.predictions);
//     } catch (error: any) {
//       console.error("API Error:", error);
//       Alert.alert("API Error", error.message || "Something went wrong.");
//     }
//   };

//   return (
//     <ScrollView style={{ padding: 20 }}>
//       <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
//         Allergy Prediction
//       </Text>

//       <Text>Gender</Text>
//       <Picker
//         selectedValue={formData.GENDER_FACTOR}
//         onValueChange={(value) => handleChange("GENDER_FACTOR", value)}
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       >
//         <Picker.Item label="Select Gender" value="" />
//         <Picker.Item label="Male" value="Male" />
//         <Picker.Item label="Female" value="Female" />
//         <Picker.Item label="Other" value="Other" />
//       </Picker>

//       <Text>Race</Text>
//       <Picker
//         selectedValue={formData.RACE_FACTOR}
//         onValueChange={(value) => handleChange("RACE_FACTOR", value)}
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       >
//         <Picker.Item label="Select Race" value="" />
//         <Picker.Item label="Asian" value="Asian" />
//         <Picker.Item label="Black" value="Black" />
//         <Picker.Item label="White" value="White" />
//         <Picker.Item label="Other" value="Other" />
//       </Picker>

//       <Text>Ethnicity</Text>
//       <Picker
//         selectedValue={formData.ETHNICITY_FACTOR}
//         onValueChange={(value) => handleChange("ETHNICITY_FACTOR", value)}
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//       >
//         <Picker.Item label="Select Ethnicity" value="" />
//         <Picker.Item label="Hispanic" value="Hispanic" />
//         <Picker.Item label="Non-Hispanic" value="Non-Hispanic" />
//       </Picker>

//       <Text>ATOPIC MARCH COHORT</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//         value={formData.ATOPIC_MARCH_COHORT}
//         onChangeText={(text) => handleChange("ATOPIC_MARCH_COHORT", text)}
//       />

//       <Text>ATOPIC DERM START (YYYY-MM-DD)</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//         value={formData.ATOPIC_DERM_START}
//         onChangeText={(text) => handleChange("ATOPIC_DERM_START", text)}
//       />

//       <Text>ALLERGIC RHINITIS START (YYYY-MM-DD)</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//         value={formData.ALLERGIC_RHINITIS_START}
//         onChangeText={(text) => handleChange("ALLERGIC_RHINITIS_START", text)}
//       />

//       <Text>ASTHMA START (YYYY-MM-DD)</Text>
//       <TextInput
//         style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
//         value={formData.ASTHMA_START}
//         onChangeText={(text) => handleChange("ASTHMA_START", text)}
//       />

//       <Button title="Predict" onPress={handleSubmit} />

//       {predictions.length > 0 && (
//         <View style={{ marginTop: 20 }}>
//           <Text style={{ fontSize: 18, fontWeight: "bold" }}>Predicted Allergies:</Text>
//           {predictions.map((allergy, index) => (
//             <Text key={index} style={{ fontSize: 16 }}>{allergy}</Text>
//           ))}
//         </View>
//       )}
//     </ScrollView>
//   );
// };

// export default AllergyPrediction;