// // app/feeding.tsx
// import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';

// const feedingGuidelines = [
//   {
//     age: '0-6 months',
//     recommendations: [
//       'Exclusive breastfeeding is recommended',
//       'Feed on demand, usually 8-12 times per day',
//       'Look for hunger cues: rooting, sucking motions, hand to mouth',
//       'Each feeding session typically lasts 20-40 minutes',
//     ],
//     tips: [
//       'Ensure proper latch during breastfeeding',
//       'Wake baby for feeding if sleeping more than 4 hours',
//       'Track wet and soiled diapers to ensure adequate intake',
//     ],
//     image: 'https://images.unsplash.com/photo-1590649384683-f20a862ede96?auto=format&fit=crop&q=80&w=800',
//   },
//   // Add more age groups here
// ];

// const nutritionChart = {
//   title: 'Baby Nutrition Guide',
//   src: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800',
// };

// export default function Feeding() {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Feeding Guidelines</Text>

//       <View style={styles.section}>
//         <Text style={styles.subtitle}>Nutrition Overview</Text>
//         <Image source={{ uri: nutritionChart.src }} style={styles.image} />
//         <Text style={styles.imageText}>{nutritionChart.title}</Text>
//       </View>

//       {feedingGuidelines.map((guide) => (
//         <View key={guide.age} style={styles.card}>
//           <Image source={{ uri: guide.image }} style={styles.cardImage} />
//           <Text style={styles.cardTitle}>{guide.age}</Text>

//           <View style={styles.cardContent}>
//             <View style={styles.column}>
//               <Text style={styles.columnTitle}>Recommendations</Text>
//               {guide.recommendations.map((item) => (
//                 <Text key={item} style={styles.listItem}>• {item}</Text>
//               ))}
//             </View>

//             <View style={styles.column}>
//               <Text style={styles.columnTitle}>Tips</Text>
//               {guide.tips.map((item) => (
//                 <Text key={item} style={styles.listItem}>• {item}</Text>
//               ))}
//             </View>
//           </View>
//         </View>
//       ))}

//       <View style={styles.videoContainer}>
//         <WebView
//           source={{ uri: 'https://www.youtube.com/embed/C3_v6FJ4MZs' }}
         
//           style={styles.video}
//         />
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
//   subtitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#1a73e8',
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   imageText: {
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   section: {
//     marginBottom: 20, // Add this
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
//   videoContainer: {
//     height: 200,
//     marginTop: 16,
//   },
//   video: {
//     flex: 1,
//   },
// });




























import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';

const feedingGuidelines = [
  {
    age: '0-6 months',
    recommendations: [
      'Exclusive breastfeeding is recommended',
      'Feed on demand, usually 8-12 times per day',
      'Look for hunger cues: rooting, sucking motions, hand to mouth',
      'Each feeding session typically lasts 20-40 minutes',
    ],
    tips: [
      'Ensure proper latch during breastfeeding',
      'Wake baby for feeding if sleeping more than 4 hours',
      'Track wet and soiled diapers to ensure adequate intake',
    ],
    image: '..\assets\images\th (3).jpg',
  },
  {
    age: '6-12 months',
    recommendations: [
      'Introduce solid foods, starting with single-grain cereals and pureed vegetables',
      'Feed baby 2-3 times a day, along with breastfeeding or formula',
      'Gradually increase the variety of solid foods as baby gets older',
      'Avoid honey until after the first year',
    ],
    tips: [
      'Make sure solid foods are smooth and easy to swallow',
      'Offer water in a sippy cup',
      'Always supervise baby during mealtime',
    ],
    image: 'https://images.unsplash.com/photo-1587638384747-cb59d5bb8e8c?auto=format&fit=crop&q=80&w=800',
  },
  {
    age: '1-2 years',
    recommendations: [
      'Introduce a variety of finger foods, including fruits, vegetables, and small pieces of soft protein',
      'Offer meals 3 times a day, along with snacks in between',
      'Encourage self-feeding and develop motor skills',
      'Continue breastfeeding or formula until 2 years if desired',
    ],
    tips: [
      'Avoid foods that are choking hazards (e.g., whole grapes, nuts)',
      'Encourage family-style meals for social eating',
      'Introduce whole milk after 12 months, if recommended by the pediatrician',
    ],
    image: 'https://images.unsplash.com/photo-1574226516837-29c4a57a0e5f?auto=format&fit=crop&q=80&w=800',
  },
];

const nutritionChart = {
  title: 'Baby Nutrition Guide',
  src: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800',
};
export default function Feeding() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Feeding Guidelines</Text>
        <View style={styles.section}>
          <Text style={styles.subtitle}>Nutrition Overview</Text>
          <Image source={{ uri: nutritionChart.src }} style={styles.image} />
          <Text style={styles.imageText}>{nutritionChart.title}</Text>
        </View>

        {feedingGuidelines.map((guide) => (
          <View key={guide.age} style={styles.card}>
            <Image source={{ uri: guide.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{guide.age}</Text>
            <View style={styles.cardContent}>
              <View style={styles.column}>
                <Text style={styles.ageGroupHeading}>Age Group: {guide.age}</Text>
                <Text style={styles.columnTitle}>Recommendations</Text>
                {guide.recommendations.map((item) => (
                  <Text key={item} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </View>
              <View style={styles.column}>
                <Text style={styles.columnTitle}>Tips</Text>
                {guide.tips.map((item) => (
                  <Text key={item} style={styles.listItem}>
                    • {item}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navbar */}
      <BlurView intensity={20} style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./home')}>
            <FontAwesome name="home" size={22} color="#2D4BC2" />
            <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./community')}>
            <FontAwesome name="users" size={22} color="#888" />
            <Text style={styles.navText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./CHDR')}>
            <FontAwesome name="line-chart" size={22} color="#888" />
            <Text style={styles.navText}>Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./Channel')}>
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
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a73e8',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  imageText: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
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
  ageGroupHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a73e8',
    marginBottom: 8,
  },
});
