import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

// Define the type for milestones
type MilestoneCategory = 'social' | 'movement' | 'cognitive';

type Milestone = {
  age: string;
  social: string[];
  movement: string[];
  cognitive: string[];
  image: string;
};

const milestones: Milestone[] = [
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
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, string>>({});

  const handleComplete = (age: string, category: MilestoneCategory, item: string) => {
    const date = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    setCompletedMilestones((prev) => ({
      ...prev,
      [`${age}-${category}-${item}`]: date,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Development Milestones</Text>
      {milestones.map((milestone) => (
        <View key={milestone.age} style={styles.card}>
          <Image source={{ uri: milestone.image }} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{milestone.age}</Text>

          <View style={styles.cardContent}>
            {(['social', 'movement', 'cognitive'] as MilestoneCategory[]).map((category) => (
              <View key={category} style={styles.column}>
                <Text style={styles.columnTitle}>{category.charAt(0).toUpperCase() + category.slice(1)}</Text>
                {(milestone[category] as string[]).map((item: string) => (
                  <View key={item} style={styles.milestoneItem}>
                    <Text style={styles.listItem}>• {item}</Text>
                    {completedMilestones[`${milestone.age}-${category}-${item}`] ? (
                      <Text style={styles.dateText}>
                        Completed: {completedMilestones[`${milestone.age}-${category}-${item}`]}
                      </Text>
                    ) : (
                      <TouchableOpacity onPress={() => handleComplete(milestone.age, category, item)}>
                        <Text style={styles.completeButton}>Mark as Completed</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            ))}
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
    paddingBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: '#ddd',
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
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  completeButton: {
    fontSize: 12,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 12,
    color: '#28a745',
    fontWeight: 'bold',
  },
});
