import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const DoctorHomePage: React.FC = () => {
  const [greeting, setGreeting] = useState('Good morning');
  const router = useRouter();
  const scrollY = new Animated.Value(0);

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  // Mock doctor data (replace with actual data from auth system)
  const doctor = {
    name: 'Dr. Jane Smith',
    specialty: 'Pediatrician',
    email: 'jane.smith@example.com',
    registrationDate: '10 Mar 2020',
  };

  useEffect(() => {
    // Set greeting based on time of day
    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good morning');
    else if (hours < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    // Animate components on load
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Mock data for appointments and patient requests
  const appointments = [
    { id: '1', patient: 'John Doe', time: '10:00 AM', date: 'Mar 07, 2025' },
    { id: '2', patient: 'Mary Johnson', time: '2:30 PM', date: 'Mar 07, 2025' },
  ];

  const patientRequests = [
    { id: '1', patient: 'Sarah Lee', reason: 'Follow-up', date: 'Mar 06, 2025' },
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Dynamic Gradient Background */}
      <LinearGradient
        colors={['#E8F0FF', '#FFFFFF']}
        style={styles.gradientBackground}
      />

      {/* Main Content */}
      <Animated.ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Animated Greeting Section */}
        <Animated.View
          style={[
            styles.greetingContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <FontAwesome name="user-md" size={28} color="#2D4BC2" />
          <View>
            <Text style={styles.greeting}>{greeting}, {doctor.name}</Text>
            <Text style={styles.subGreeting}>Ready to make a difference?</Text>
          </View>
        </Animated.View>

        {/* Doctor Profile Summary */}
        <View style={styles.profileContainer}>
          <LinearGradient
            colors={['#2D4BC220', '#2D4BC205']}
            style={styles.profileGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.profileHeader}>
              <FontAwesome name="user" size={20} color="#2D4BC2" />
              <Text style={styles.profileTitle}>Your Profile</Text>
            </View>
            <View style={styles.profileContent}>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Name</Text>
                <Text style={styles.profileValue}>{doctor.name}</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Specialty</Text>
                <Text style={styles.profileValue}>{doctor.specialty}</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Email</Text>
                <Text style={styles.profileValue}>{doctor.email}</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Joined</Text>
                <Text style={styles.profileValue}>{doctor.registrationDate}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push('/doctor-profile' as any)} // Adjust route as needed
            >
              <Text style={styles.profileButtonText}>Edit Your Profile</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Today's Appointments */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Today’s Appointments</Text>
          {appointments.map((appt) => (
            <TouchableOpacity key={appt.id} style={styles.appointmentCard}>
              <FontAwesome name="calendar" size={20} color="#2D4BC2" />
              <View style={styles.appointmentDetails}>
                <Text style={styles.appointmentText}>{appt.patient}</Text>
                <Text style={styles.appointmentSubText}>{appt.time} - {appt.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        

        {/* Space for bottom navbar */}
        <View style={styles.bottomSpace} />
      </Animated.ScrollView>

      {/* Glass-effect Bottom Navbar */}
           <BlurView intensity={20} style={styles.navbarContainer}>
              <View style={styles.navbar}>
                <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/home')}>
                  <FontAwesome name="home" size={22} color="#2D4BC2" />
                  <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/community'as any)}>
                  <FontAwesome name="users" size={22} color="#888" />
                  <Text style={styles.navText}>Community</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Insights' as any)}>
                  <FontAwesome name="line-chart" size={22} color="#888" />
                  <Text style={styles.navText}>Insights</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/MedicalHistory' as any)}>
                  <FontAwesome name="file-text" size={22} color="#888" />
                  <Text style={styles.navText}>Medical History</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFF',
  },
  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D4BC2',
    marginLeft: 10,
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    marginTop: 5,
  },
  profileContainer: {
    marginBottom: 24,
  },
  profileGradient: {
    borderRadius: 16,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D4BC2',
    marginLeft: 8,
  },
  profileContent: {
    marginBottom: 16,
  },
  profileItem: {
    marginBottom: 12,
  },
  profileLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  profileValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D4BC2',
  },
  profileButton: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D4BC2',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D4BC2',
    marginBottom: 15,
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  appointmentDetails: {
    marginLeft: 12,
  },
  appointmentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D4BC2',
  },
  appointmentSubText: {
    fontSize: 12,
    color: '#888',
  },
  requestCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  requestDetails: {
    marginLeft: 12,
  },
  requestText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D4BC2',
  },
  requestSubText: {
    fontSize: 12,
    color: '#888',
  },
  bottomSpace: {
    height: 100,
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingBottom: 20,
    paddingTop: 12,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  navText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  activeNavText: {
    color: '#2D4BC2',
    fontWeight: '600',
  },
});

export default DoctorHomePage;