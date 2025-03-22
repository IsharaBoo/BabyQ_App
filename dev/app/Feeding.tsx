// app/feeding.tsx
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

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
    image: 'https://images.unsplash.com/photo-1590649384683-f20a862ede96?auto=format&fit=crop&q=80&w=800',
  },
  // Add more age groups here
];

const nutritionChart = {
  title: 'Baby Nutrition Guide',
  src: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=800',
};

export default function Feeding() {
  return (
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
              <Text style={styles.columnTitle}>Recommendations</Text>
              {guide.recommendations.map((item) => (
                <Text key={item} style={styles.listItem}>• {item}</Text>
              ))}
            </View>

            <View style={styles.column}>
              <Text style={styles.columnTitle}>Tips</Text>
              {guide.tips.map((item) => (
                <Text key={item} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
          </View>
        </View>
      ))}

      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: 'https://www.youtube.com/embed/C3_v6FJ4MZs' }}
         
          style={styles.video}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
    marginBottom: 20, // Add this
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
  videoContainer: {
    height: 200,
    marginTop: 16,
  },
  video: {
    flex: 1,
  },
});