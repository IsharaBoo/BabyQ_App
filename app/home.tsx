import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import the router for navigation

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/doctorSearchResults?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryPress = (category: string) => {
    router.push(`/doctorCategory?category=${encodeURIComponent(category)}`);
  };

  const categories = [
    { id: '1', title: 'General Physician', icon: 'user-md' },
    { id: '2', title: 'Pediatrician', icon: 'child' },
    { id: '3', title: 'Cardiologist', icon: 'heartbeat' },
    { id: '4', title: 'Orthopedics', icon: 'wheelchair' },
    { id: '5', title: 'Neurologist', icon: 'brain' },
    { id: '6', title: 'Dermatologist', icon: 'user' },
  ];

  const ads = [
    { id: '1', image: require('../assets/images/ad1.png') },
    { id: '2', image: require('../assets/images/ad2.png') },
    { id: '3', image: require('../assets/images/ad3.png') },
    { id: '4', image: require('../assets/images/ad4.png') },
    { id: '5', image: require('../assets/images/ad6.jpg') },
  ];

  const news = [
    { id: '1', title: 'Protect Your Child from Diabetes: Prevention Starts Today', date: '11 Dec 2024', image: require('../assets/images/diabetes.png'), url: 'https://newsinhealth.nih.gov/2024/11/preventing-diabetes' },
    { id: '2', title: '6 Essential Tips to Protect Your Child during the Flu Season', date: '12 Dec 2024', image: require('../assets/images/flu.png'), url: 'https://www.choa.org/parent-resources/flu/how-to-prevent-the-flu' },
    { id: '3', title: 'Rising Malaria thread around the world', date: '10 Dec 2024', image: require('../assets/images/threat.png'), url: 'https://www.weforum.org/stories/2022/02/eliminating-malaria-is-within-reach/' },
    { id: '4', title: '5,000 unvaccinated children in Colombo city spark fear of disease resurgence', date: '3 Jan 2025', image: require('../assets/images/vaccine.jpeg'), url: 'https://island.lk/5000-unvaccinated-children-in-colombo-city-spark-fear-of-disease-resurgence/' },
  ];

  const handlePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <ScrollView style={styles.contentContainer}>
        {/* Greeting Section */}
        <View style={styles.greetingContainer}>
          <FontAwesome name="user-circle" size={28} color="#2D4BC2" />
          <View>
            <Text style={styles.greeting}>Hello, Peter</Text>
            <Text style={styles.subGreeting}>How are you today?</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search a doctor"
            style={styles.searchInput}
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

       {/* Ads Section */}
       <Text style={styles.sectionTitle}>Featured Ads</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.adsContainer}>
          {ads.map((ad) => (
            <Image key={ad.id} source={ad.image} style={styles.adImage} />
          ))}
        </ScrollView>

        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Categories</Text>
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
             <FontAwesome name={item.icon as 'user-md' | 'child' | 'heartbeat' | 'wheelchair' | 'user'} size={24} color="#2D4BC2" />
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />

      
        {/* News/Articles Section */}
        <Text style={styles.sectionTitle}>Latest News</Text>
        <View style={styles.newsContainer}>
          {news.map((article) => (
            <TouchableOpacity key={article.id} style={styles.newsCard} onPress={() => handlePress(article.url)}>
              <Image source={article.image} style={styles.newsImage} />
              <Text style={styles.newsTitle}>{article.title}</Text>
              <Text style={styles.newsDate}>{article.date} | News Article</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/home')}>
          <FontAwesome name="home" size={24} color="#2D4BC2" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/community' as any)}>
          <FontAwesome name="users" size={24} color="#666" />
          <Text style={styles.navText}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/Insights' as any)}>
          <FontAwesome name="line-chart" size={24} color="#666" />
          <Text style={styles.navText}>Insights</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.replace('/MedicalHistory' as any)}>
          <FontAwesome name="file" size={24} color="#666" />
          <Text style={styles.navText}>Medical History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#2D4BC2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  adsContainer: {
    marginBottom: 20,
  },
  adImage: {
    width: 130, // Make the width and height the same for a square
    height: 95,
    borderRadius: 8,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D4BC2',
    marginBottom: 15,
    marginTop: 10,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    padding: 15,
    marginRight: 10,
    width: 170,
    height: 80,
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D4BC2',
    marginTop: 5,
  },
  newsContainer: {
    marginBottom: 20,
  },
  newsCard: {
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  newsImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D4BC2',
    marginBottom: 5,
  },
  newsDate: {
    fontSize: 14,
    color: '#666',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});