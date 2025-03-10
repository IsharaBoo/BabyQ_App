import { 
  View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import React, { useState } from 'react';

const CommunityPage = () => {
  const [posts, setPosts] = useState([
    { id: '7', name: 'Emma', content: 'Has anyone tried natural remedies for baby colic? Any tips?', likes: 0, comments: [] },
    { id: '8', name: 'David', content: 'What age did your baby start sleeping through the night? Any suggestions?', likes: 0, comments: [] },
    { id: '9', name: 'Sophia', content: 'My toddler has a fever, what’s the best way to manage it? Should I call the doctor?', likes: 0, comments: [] },
    { id: '10', name: 'James', content: 'Has anyone dealt with teething pains in babies? How did you manage it?', likes: 0, comments: [] },
    { id: '11', name: 'Olivia', content: 'Looking for advice on vaccines for my newborn. What are the recommended schedules?', likes: 0, comments: [] },
    { id: '12', name: 'Lucas', content: 'What are some signs of allergies in children? How can I test them at home?', likes: 0, comments: [] },
    { id: '13', name: 'Mia', content: 'My child has a rash that doesn’t seem to go away. Should I be concerned?', likes: 0, comments: [] },
    { id: '14', name: 'Ethan', content: 'Can anyone recommend a pediatrician in the area who specializes in child respiratory issues?', likes: 0, comments: [] },
    { id: '15', name: 'Ava', content: 'What foods should I avoid giving my baby to prevent allergies?', likes: 0, comments: [] },
    { id: '16', name: 'Isabella', content: 'Does anyone have tips for managing eczema in toddlers? How do you soothe their skin?', likes: 0, comments: [] },
    { id: '17', name: 'Liam', content: 'My baby has been crying a lot lately and has a stomach ache. Any home remedies or advice?', likes: 0, comments: [] },
    { id: '18', name: 'Benjamin', content: 'I’m looking for advice on baby milestones. How can I help my child hit them on time?', likes: 0, comments: [] },
    { id: '19', name: 'Charlotte', content: 'What are some safe and effective ways to introduce solid foods to a 6-month-old?', likes: 0, comments: [] },
    { id: '20', name: 'Amelia', content: 'Has anyone tried baby probiotics? Are they safe and effective for digestive health?', likes: 0, comments: [] }
    
  ]);

  const [commentText, setCommentText] = useState('');
  const [activePost, setActivePost] = useState(null); 

  // Handle likes
  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Add a comment
  const addComment = (id) => {
    if (!commentText.trim()) return; 

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, comments: [...post.comments, commentText] }
          : post
      )
    );

    setCommentText('');
  };

  // Toggle comments
  const toggleComments = (id) => {
    setActivePost(activePost === id ? null : id);
  };

  // Hide keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setActivePost(null);
  };

  // Render post
  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postOwner}>{item.name}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
          <Text style={{color:'black', paddingBottom:5}}>{item.likes} </Text>
          <Text style={{fontSize:18, backgroundColor:'white'}}>👍</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleComments(item.id)} style={styles.commentButton}>
          <Text style={{paddingTop:26, fontSize:18}}>💬  </Text>
        </TouchableOpacity>
      </View>

      {/* Comments Section */}
      {activePost === item.id && (
        <View style={styles.commentSection}>
          <FlatList
            data={item.comments}
            keyExtractor={(comment, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
          />
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.commentInputContainer}
          >
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity onPress={() => addComment(item.id)} style={styles.commentPostButton}>
              <Text style={{ color: 'white' }}>Post</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      )}
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.flexContainer}
        >
          <View style={styles.inputBox}>
            <Text style={styles.text}>What's on your mind?  💭</Text>
          </View>

          {/* SCROLLABLE POSTS */}
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }} // Ensure bottom space for comments
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f8f9fa', 
  },
  flexContainer: {
    flex: 1, // Allows scrolling of posts
    width: '100%',
    alignItems: 'center',
  },
  inputBox: {
    backgroundColor: '#2D4BC2',
    width: 260,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 20,
    
  },
  text: {
    fontSize: 17,
    color:'white',
  },
  postContainer: {
    width: 335,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'red',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  postOwner: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  postContent: {
    fontSize: 19,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeButton: {
    padding: 5,
    //backgroundColor: '#2D4BC2',
    borderRadius: 5,
    paddingLeft:10,
    
  },
  commentButton: {
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
   // backgroundColor: '#2D4BC2',
    borderRadius: 5,
    
  },
  commentSection: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  comment: {
    fontSize: 14,
    padding: 5,
    backgroundColor: '#fff',
    marginVertical: 2,
    borderRadius: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  commentInput: {
    flex: 1,
    padding: 5,
    fontSize: 14,
  },
  commentPostButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 5,
  },
});

export default CommunityPage;  