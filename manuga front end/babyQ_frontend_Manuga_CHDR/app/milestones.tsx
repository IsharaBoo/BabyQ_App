// app/milestones.tsx
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const milestones = [
  {
    age: '2 Months',
    social: ['Begins to smile at people', 'Tries to look at parent'],
    movement: ['Can hold head up', 'Makes smoother movements with arms and legs'],
    cognitive: ['Pays attention to faces', 'Begins to follow things with eyes'],
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800',
  },
  {
    age: '4 Months',
    social: ['Smiles spontaneously', 'Likes to play with people'],
    movement: ['Holds head steady', 'Pushes down on legs when feet are on hard surface'],
    cognitive: ['Lets you know if happy or sad', 'Responds to affection'],
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800',
  },
  {
    age: '6 Months',
    social: ['Knows familiar faces', 'Likes to look at self in mirror'],
    movement: ['Rolls over in both directions', 'Begins to sit without support'],
    cognitive: ['Shows curiosity about things', 'Brings things to mouth'],
    image: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?auto=format&fit=crop&q=80&w=800',
  },
];

export default function Milestones() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Development Milestones</Text>

      {milestones.map((milestone) => (
        <View key={milestone.age} style={styles.card}>
          <Image source={{ uri: milestone.image }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{milestone.age}</Text>

          <View style={styles.cardContent}>
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Social/Emotional</Text>
              {milestone.social.map((item) => (
                <Text key={item} style={styles.listItem}>• {item}</Text>
              ))}
            </View>

            <View style={styles.column}>
              <Text style={styles.columnTitle}>Movement</Text>
              {milestone.movement.map((item) => (
                <Text key={item} style={styles.listItem}>• {item}</Text>
              ))}
            </View>

            <View style={styles.column}>
              <Text style={styles.columnTitle}>Cognitive</Text>
              {milestone.cognitive.map((item) => (
                <Text key={item} style={styles.listItem}>• {item}</Text>
              ))}
            </View>
          </View>
        </View>
      ))}
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
});