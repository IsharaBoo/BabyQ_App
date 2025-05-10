// import React, { useEffect } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { router } from 'expo-router';

// export default function SplashScreen() {
//   useEffect(() => {
//     // Simulate a delay for the splash screen
//     const timer = setTimeout(() => {
//       router.replace('/landingPage1' as any); 
//     }, 3000); // 3 seconds delay

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Image */}
//       <Image
//         source={require('../assets/images/babyQlogo.png')} // Path to your image
//         style={styles.image}
//         resizeMode="contain"
//       />

//       {/* Text */}
//       <Text style={styles.title}>BabyQ</Text>
//       <Text style={styles.subtitle}>HEALTHCARE SOLUTION</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: 150, // Adjust the size as needed
//     height: 150, // Adjust the size as needed
//     marginBottom: 20, // Space between image and text
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#2D4BC2',
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#05685E',
//     marginTop: 10,
//   },
// });






































// // index.tsx
// // app/index.tsx
// import { useRouter } from 'expo-router'; // Import useRouter
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// export default function HomeScreen() {
//   const router = useRouter(); // Initialize the router

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}><b>CHDRS</b></Text>

//       {/* Use TouchableOpacity for navigation */}
//       <TouchableOpacity onPress={() => router.push('./Feeding')} style={styles.link}>
//         <Text style={styles.linkText}>   Feeding Guidelines      </Text>
//       </TouchableOpacity>

//       {/* Uncomment and add other navigation links as needed */}
//       <TouchableOpacity onPress={() => router.push('./mental-health')} style={styles.link}>
//         <Text style={styles.linkText}>Mental Health Guidance </Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => router.push('./milestones')} style={styles.link}>
//         <Text style={styles.linkText}>Development Milestones</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => router.push('./newborn-care')} style={styles.link}>
//         <Text style={styles.linkText}>Newborn Care Guidelines</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 16,
//   },
//   link: {
//     padding: 10,
//     backgroundColor: '#007AFF', // Example button style
//     borderRadius: 5,
//     marginVertical: 8,
//   },
//   linkText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });




















import { useRouter } from 'expo-router'; // Import useRouter
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

export default function HomeScreen() {
  const router = useRouter(); // Initialize the router

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}><b>CHDRS</b></Text>

        {/* Use TouchableOpacity for navigation */}
        <TouchableOpacity onPress={() => router.push('./Feeding')} style={styles.link}>
          <Text style={styles.linkText}>Feeding Guidelines</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('./mental-health')} style={styles.link}>
          <Text style={styles.linkText}>Mental Health Guidance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('./milestones')} style={styles.link}>
          <Text style={styles.linkText}>Development Milestones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('./newborn-care')} style={styles.link}>
          <Text style={styles.linkText}>Newborn Care Guidelines</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navbar */}
      <BlurView intensity={20} style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./home')}>
            <FontAwesome name="home" size={22} color="#888" />
            <Text style={[styles.navText, styles.navText]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./community')}>
            <FontAwesome name="users" size={22} color="#888" />
            <Text style={styles.navText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push('./CHDR')}>
            <FontAwesome name="line-chart" size={22} color="#2D4BC2" />
            <Text style={styles.activeNavText}>Insights</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  link: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginVertical: 8,
  },
  linkText: {
    color: '#fff',
    fontSize: 18,
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