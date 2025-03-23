// // app/mental-health.tsx
// import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

// const mentalHealthAdvice = [
//   {
//     stage: 'Infancy (0-12 months)',
//     signs: [
//       'Difficulty being soothed or calmed',
//       'Limited social engagement or eye contact',
//       'Excessive crying or irritability',
//       'Sleep or feeding problems',
//     ],
//     recommendations: [
//       'Maintain consistent routines',
//       'Provide plenty of physical contact and comfort',
//       'Respond promptly to baby\'s needs',
//       'Create a calm environment',
//     ],
//     image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
//   },
//   {
//     stage: 'Toddlers (1-3 years)',
//     signs: [
//       'Excessive tantrums or aggression',
//       'Extreme separation anxiety',
//       'Limited interest in social interaction',
//       'Regression in skills',
//     ],
//     recommendations: [
//       'Set consistent boundaries and routines',
//       'Offer choices to build independence',
//       'Provide plenty of positive attention',
//       'Create opportunities for safe exploration',
//     ],
//     image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
//   },
//   {
//     stage: 'Preschoolers (3-5 years)',
//     signs: [
//       'Persistent anxiety or fears',
//       'Difficulty with transitions',
//       'Social withdrawal',
//       'Aggressive behavior',
//     ],
//     recommendations: [
//       'Help identify and express emotions',
//       'Maintain consistent daily routines',
//       'Encourage social interaction and play',
//       'Practice positive reinforcement',
//     ],
//     image: 'https://images.unsplash.com/photo-1544829832-c8047d6a8221?auto=format&fit=crop&q=80&w=800',
//   },
// ];

// export default function MentalHealth() {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Child Mental Health Guidance</Text>

//       {mentalHealthAdvice.map((stage) => (
//         <View key={stage.stage} style={styles.card}>
//           <Image source={{ uri: stage.image }} style={styles.cardImage} />
//           <Text style={styles.cardTitle}>{stage.stage}</Text>

//           <View style={styles.cardContent}>
//             <View style={styles.column}>
//               <Text style={styles.columnTitle}>Warning Signs</Text>
//               {stage.signs.map((item) => (
//                 <Text key={item} style={styles.listItem}>• {item}</Text>
//               ))}
//             </View>

//             <View style={styles.column}>
//               <Text style={styles.columnTitle}>Recommendations</Text>
//               {stage.recommendations.map((item) => (
//                 <Text key={item} style={styles.listItem}>• {item}</Text>
//               ))}
//             </View>
//           </View>
//         </View>
//       ))}

//       <View style={styles.tipBox}>
//         <Text style={styles.tipTitle}>When to Seek Professional Help</Text>
//         <Text style={styles.tipText}>• Persistent changes in behavior or mood</Text>
//         <Text style={styles.tipText}>• Significant impact on daily functioning</Text>
//         <Text style={styles.tipText}>• Concerns about development or social interaction</Text>
//         <Text style={styles.tipText}>• Family history of mental health conditions</Text>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//   },
//   card: {
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     marginBottom: 16,
//     overflow: 'hidden',
//   },
//   cardImage: {
//     width: '100%',
//     height: 150,
//   },
//   cardTitle: {
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   cardContent: {
//     padding: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   column: {
//     flex: 1,
//     marginRight: 8,
//   },
//   columnTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#333',
//   },
//   listItem: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 4,
//   },
//   tipBox: {
//     backgroundColor: '#e3f2fd',
//     borderRadius: 8,
//     padding: 16,
//     marginTop: 16,
//   },
//   tipTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#1976d2',
//   },
//   tipText: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 4,
//   },
// });





































import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
const mentalHealthAdvice = [
  {
    stage: 'Infancy (0-12 months)',
    signs: [
      'Difficulty being soothed or calmed',
      'Limited social engagement or eye contact',
      'Excessive crying or irritability',
      'Sleep or feeding problems',
    ],
    recommendations: [
      'Maintain consistent routines',
      'Provide plenty of physical contact and comfort',
      'Respond promptly to baby\'s needs',
      'Create a calm environment',
    ],
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
  },
  {
    stage: 'Toddlers (1-3 years)',
    signs: [
      'Excessive tantrums or aggression',
      'Extreme separation anxiety',
      'Limited interest in social interaction',
      'Regression in skills',
    ],
    recommendations: [
      'Set consistent boundaries and routines',
      'Offer choices to build independence',
      'Provide plenty of positive attention',
      'Create opportunities for safe exploration',
    ],
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800',
  },
  {
    stage: 'Preschoolers (3-5 years)',
    signs: [
      'Persistent anxiety or fears',
      'Difficulty with transitions',
      'Social withdrawal',
      'Aggressive behavior',
    ],
    recommendations: [
      'Help identify and express emotions',
      'Maintain consistent daily routines',
      'Encourage social interaction and play',
      'Practice positive reinforcement',
    ],
    image: 'https://images.unsplash.com/photo-1544829832-c8047d6a8221?auto=format&fit=crop&q=80&w=800',
  },
];

export default function MentalHealth() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Child Mental Health Guidance</Text>

        {mentalHealthAdvice.map((stage) => (
          <View key={stage.stage} style={styles.card}>
            <Image source={{ uri: stage.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{stage.stage}</Text>

            <View style={styles.cardContent}>
              <View style={styles.column}>
                <Text style={styles.columnTitle}>Warning Signs</Text>
                {stage.signs.map((item) => (
                  <Text key={item} style={styles.listItem}>• {item}</Text>
                ))}
              </View>

              <View style={styles.column}>
                <Text style={styles.columnTitle}>Recommendations</Text>
                {stage.recommendations.map((item) => (
                  <Text key={item} style={styles.listItem}>• {item}</Text>
                ))}
              </View>
            </View>
          </View>
        ))}

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>When to Seek Professional Help</Text>
          <Text style={styles.tipText}>• Persistent changes in behavior or mood</Text>
          <Text style={styles.tipText}>• Significant impact on daily functioning</Text>
          <Text style={styles.tipText}>• Concerns about development or social interaction</Text>
          <Text style={styles.tipText}>• Family history of mental health conditions</Text>
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
      <BlurView intensity={20} style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() =>  router.replace('./home')}>
            <FontAwesome name="home" size={22} color="#2D4BC2" />
            <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() =>  router.replace('./community')}>
            <FontAwesome name="users" size={22} color="#888" />
            <Text style={styles.navText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() =>  router.replace('./CHDR')}>
            <FontAwesome name="line-chart" size={22} color="#888" />
            <Text style={styles.navText}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() =>  router.replace('./Channel')}>
            <FontAwesome name="file-text" size={22} color="#888" />
            <Text style={styles.navText}>Medical History</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingBottom: 70, // Add space at the bottom to avoid overlap with the navbar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  columnTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  listItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  tipBox: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  activeNavText: {
    color: '#2D4BC2',
    fontWeight: 'bold',
  },
});
