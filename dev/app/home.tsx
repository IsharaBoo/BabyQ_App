import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Linking,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [greeting, setGreeting] = useState('Good morning');
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const scrollY = new Animated.Value(0);

  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  useEffect(() => {
    const checkLoginState = async () => {
      const savedUserData = await AsyncStorage.getItem('userData');
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        setUser(userData);
      } else {
        // Mock user data if no login page exists
        const mockUser = {
          name: 'Test User',
          email: 'test@example.com',
          role: 'User',
          registrationDate: '2025-03-18',
        };
        await AsyncStorage.setItem('userData', JSON.stringify(mockUser));
        setUser(mockUser);
      }
    };

    checkLoginState();

    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning');
    else if (hours < 18) setGreeting('Good Afternoon');
    else setGreeting('Hii!! Good Evening');

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

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    // Mock doctor data
    const mockDoctors = [
      { id: 1, firstName: 'John', lastName: 'Doe', position: 'Pediatrician', affiliatedHospital: 'City Hospital', phoneNumber: '123-456-7890' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', position: 'Cardiologist', affiliatedHospital: 'General Hospital', phoneNumber: '098-765-4321' },
      { id: 3, firstName: 'Emily', lastName: 'Brown', position: 'Neurologist', affiliatedHospital: 'Neuro Center', phoneNumber: '555-123-4567' },
      { id: 4, firstName: 'Michael', lastName: 'Lee', position: 'Orthopedics', affiliatedHospital: 'Bone Clinic', phoneNumber: '444-987-6543' },
    ];

    // Filter mock data based on search query
    const filteredResults = mockDoctors.filter(doc =>
      doc.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.affiliatedHospital.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
    if (filteredResults.length === 0) {
      Alert.alert('No Results', `No doctors found for "${searchQuery}".`);
    }
  };

  const handleCategoryPress = (category: string) => {
    // Simulate navigation or show alert if page is missing
    Alert.alert('Info', `Would navigate to ${category} category page`);
    // router.push(`/doctorCategory?category=${encodeURIComponent(category)}`);
  };

  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
      Alert.alert('Logged Out', 'You have been logged out.');
      setUser(null); // Reset user state instead of redirecting
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const renderDoctorResult = ({ item }: { item: any }) => (
    <View style={styles.doctorCard}>
      <Text style={styles.doctorName}>{`${item.firstName} ${item.lastName}`}</Text>
      <Text style={styles.doctorSpecialty}>{item.position}</Text>
      <Text style={styles.doctorHospital}>{item.affiliatedHospital}</Text>
      <Text style={styles.doctorPhone}>{item.phoneNumber}</Text>
    </View>
  );

  const categories = [
    { id: '1', title: 'General Physician', icon: 'user-md', color: '#4E7CFE' },
    { id: '2', title: 'Pediatrician', icon: 'child', color: '#FE7C7C' },
    { id: '3', title: 'Cardiologist', icon: 'heart', color: '#7CFE9A' },
    { id: '4', title: 'Orthopedics', icon: 'wheelchair', color: '#FED27C' },
    { id: '5', title: 'Neurologist', icon: 'brain', color: '#D77CFE' },
    { id: '6', title: 'Dermatologist', icon: 'allergies', color: '#7CFEFC' },
  ];

  const ads = [
    { id: '1', image: require('../assets/images/ad1.png'), title: 'Health Insurance Plans' },
    { id: '2', image: require('../assets/images/ad2.png'), title: 'Annual Checkup Discount' },
    { id: '3', image: require('../assets/images/ad3.png'), title: 'Mental Health Services' },
    { id: '4', image: require('../assets/images/ad4.png'), title: 'New Clinic Opening' },
    { id: '5', image: require('../assets/images/ad6.jpg'), title: 'Family Healthcare Packages' },
  ];

  const news = [
    { id: '1', title: 'Protect Your Child from Diabetes: Prevention Starts Today', date: '11 Dec 2024', image: require('../assets/images/diabetes.png'), url: 'https://newsinhealth.nih.gov/2024/11/preventing-diabetes', tag: 'Prevention' },
    { id: '2', title: '6 Essential Tips to Protect Your Child during the Flu Season', date: '12 Dec 2024', image: require('../assets/images/flu.png'), url: 'https://www.choa.org/parent-resources/flu/how-to-prevent-the-flu', tag: 'Seasonal' },
    { id: '3', title: 'Rising Malaria threat around the world', date: '10 Dec 2024', image: require('../assets/images/threat.png'), url: 'https://www.weforum.org/stories/2022/02/eliminating-malaria-is-within-reach/', tag: 'Global' },
    { id: '4', title: '5,000 unvaccinated children in Colombo city spark fear of disease resurgence', date: '3 Jan 2025', image: require('../assets/images/vaccine.jpeg'), url: 'https://island.lk/5000-unvaccinated-children-in-colombo-city-spark-fear-of-disease-resurgence/', tag: 'Alert' },
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#E8F0FF', '#FFFFFF']} style={styles.gradientBackground} />
      <Animated.ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={[
            styles.greetingContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <FontAwesome name="user-circle" size={28} color="#2D4BC2" />
          <View>
            <Text style={styles.greeting}>
              {greeting}, {user.name.split(' ')[0]}!
            </Text>
            <Text style={styles.subGreeting}>How are you feeling today?</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.searchContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.searchInputContainer}>
            <FontAwesome name="search" size={16} color="#666" style={styles.searchIcon} />
            <TextInput
              placeholder="Find a healthcare professional..."
              style={styles.searchInput}
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <LinearGradient
              colors={['#2D4BC2', '#475FD3']}
              style={styles.searchButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {searchResults.length > 0 ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Search Results for "{searchQuery}"</Text>
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderDoctorResult}
              scrollEnabled={false}
            />
          </View>
        ) : searchQuery.trim() && searchResults.length === 0 ? (
          <View style={styles.sectionContainer}>
            <Text style={styles.noResults}>No doctors found for "{searchQuery}".</Text>
          </View>
        ) : null}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
          <FlatList
            data={ads}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.adCard}>
                <Image source={item.image} style={styles.adImage} />
                <View style={styles.adOverlay}>
                  <Text style={styles.adTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Specialist Categories</Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(item.title)}
              >
                <LinearGradient
                  colors={[item.color, item.color + '99']}
                  style={styles.categoryIconContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <FontAwesome5 name={item.icon} size={24} color="#FFFFFF" />
                </LinearGradient>
                <Text style={styles.categoryTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest News</Text>
          </View>
          <View style={styles.newsContainer}>
            {news.map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.newsCard}
                onPress={() => handlePress(article.url)}
              >
                <Image source={article.image} style={styles.newsImage} />
                <View style={styles.newsContent}>
                  <View style={styles.newsTagContainer}>
                    <Text style={styles.newsTag}>{article.tag}</Text>
                  </View>
                  <Text style={styles.newsTitle}>{article.title}</Text>
                  <Text style={styles.newsDate}>{article.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
                <Text style={styles.profileValue}>{user.name}</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Email</Text>
                <Text style={styles.profileValue}>{user.email}</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Role</Text>
                <Text style={styles.profileValue}>{user.role}</Text>
              </View>
              <View style={styles.profileItem}>
                <Text style={styles.profileLabel}>Registered On</Text>
                <Text style={styles.profileValue}>{user.registrationDate}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.profileButton}
              // onPress={() => router.push('/profile' as any)}
            >
              <Text style={styles.profileButtonText}>Edit Your Profile (Disabled)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.bottomSpace} />
      </Animated.ScrollView>

      <BlurView intensity={20} style={styles.navbarContainer}>
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/home')}>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchInputContainer: {
    flex: 1,
    height: 52,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    height: '100%',
  },
  searchButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  searchButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D4BC2',
    marginBottom: 15,
  },
  doctorCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D4BC2',
  },
  doctorSpecialty: {
    fontSize: 14,
    marginTop: 2,
    color: '#666',
  },
  doctorHospital: {
    fontSize: 14,
    color: '#888',
  },
  doctorPhone: {
    fontSize: 14,
    color: '#888',
  },
  noResults: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  adCard: {
    width: 180,
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  adImage: {
    width: '100%',
    height: '100%',
  },
  adOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  adTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryCard: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginRight: 14,
    width: 130,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  newsContainer: {
    marginBottom: 10,
  },
  newsCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 160,
  },
  newsContent: {
    padding: 16,
  },
  newsTagContainer: {
    backgroundColor: '#2D4BC215',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  newsTag: {
    fontSize: 12,
    color: '#2D4BC2',
    fontWeight: '500',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D4BC2',
    marginBottom: 8,
    lineHeight: 22,
  },
  newsDate: {
    fontSize: 12,
    color: '#888',
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
    marginBottom: 10,
  },
  profileButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D4BC2',
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
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