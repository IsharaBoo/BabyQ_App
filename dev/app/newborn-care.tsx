// // app/newborn-care.tsx
// import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

// const careCategories = [
//   {
//     title: 'Daily Care',
//     items: [
//       'Change diapers every 2-3 hours or as needed',
//       'Clean the umbilical cord area with alcohol until it falls off',
//       'Give sponge baths until umbilical cord heals',
//       'Keep baby warm but not too hot',
//       'Support head and neck when holding baby',
//     ],
//     image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
//   },
//   {
//     title: 'Sleep Safety',
//     items: [
//       'Always place baby on back to sleep',
//       'Use a firm mattress with fitted sheet',
//       'Keep soft objects and loose bedding out of crib',
//       'Maintain room temperature between 68-72°F',
//       'Share room but not bed with parents',
//     ],
//     image: 'https://images.unsplash.com/photo-1590649384683-f20a862ede96?auto=format&fit=crop&q=80&w=800',
//   },
//   {
//     title: 'Health Monitoring',
//     items: [
//       'Track wet and soiled diapers',
//       'Monitor temperature if concerned about fever',
//       'Watch for signs of jaundice',
//       'Keep up with vaccination schedule',
//       'Attend all pediatrician appointments',
//     ],
//     image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
//   },
//   {
//     title: 'Common Concerns',
//     items: [
//       'Spitting up is normal but watch for forceful vomiting',
//       'Normal stool colors range from yellow to green',
//       'Newborns may breathe irregularly with pauses',
//       'Sneezing and hiccups are normal',
//       'Contact doctor if baby seems unusually fussy',
//     ],
//     image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
//   },
// ];

// export default function NewbornCare() {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Newborn Care Guidelines</Text>

//       <View style={styles.grid}>
//         {careCategories.map((category) => (
//           <View key={category.title} style={styles.card}>
//             <Image source={{ uri: category.image }} style={styles.cardImage} />
//             <Text style={styles.cardTitle}>{category.title}</Text>

//             <View style={styles.cardContent}>
//               {category.items.map((item) => (
//                 <Text key={item} style={styles.listItem}>• {item}</Text>
//               ))}
//             </View>
//           </View>
//         ))}
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
//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   card: {
//     width: '48%',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     marginBottom: 16,
//     overflow: 'hidden',
//   },
//   cardImage: {
//     width: '100%',
//     height: 120,
//   },
//   cardTitle: {
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   cardContent: {
//     padding: 16,
//   },
//   listItem: {
//     fontSize: 12,
//     color: '#555',
//     marginBottom: 4,
//   },
// });

















































import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { useRouter } from 'expo-router';

const careCategories = [
  {
    title: 'Daily Care',
    items: [
      'Change diapers every 2-3 hours or as needed',
      'Clean the umbilical cord area with alcohol until it falls off',
      'Give sponge baths until umbilical cord heals',
      'Keep baby warm but not too hot',
      'Support head and neck when holding baby',
    ],
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Sleep Safety',
    items: [
      'Always place baby on back to sleep',
      'Use a firm mattress with fitted sheet',
      'Keep soft objects and loose bedding out of crib',
      'Maintain room temperature between 68-72°F',
      'Share room but not bed with parents',
    ],
    image: 'https://images.unsplash.com/photo-1590649384683-f20a862ede96?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Health Monitoring',
    items: [
      'Track wet and soiled diapers',
      'Monitor temperature if concerned about fever',
      'Watch for signs of jaundice',
      'Keep up with vaccination schedule',
      'Attend all pediatrician appointments',
    ],
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=800',
  },
  {
    title: 'Common Concerns',
    items: [
      'Spitting up is normal but watch for forceful vomiting',
      'Normal stool colors range from yellow to green',
      'Newborns may breathe irregularly with pauses',
      'Sneezing and hiccups are normal',
      'Contact doctor if baby seems unusually fussy',
    ],
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
  },
];

export default function NewbornCare() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={styles.container}>
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Newborn Care Guidelines</Text>

        <View style={styles.grid}>
          {careCategories.map((category) => (
            <View key={category.title} style={styles.card}>
              <Image source={{ uri: category.image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{category.title}</Text>

              {/* Heading for each category */}
              <Text style={styles.ageGroupHeading}>{category.title}</Text>

              <View style={styles.cardContent}>
                {category.items.map((item) => (
                  <Text key={item} style={styles.listItem}>• {item}</Text>
                ))}
              </View>
            </View>
          ))}
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
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
    marginBottom: 60, // Space for navbar
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 16,
  },
  listItem: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 10,
    width: '100%',
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
