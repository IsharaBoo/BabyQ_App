import { 
  View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const CommunityPage = () => {
  const [posts, setPosts] = useState([
    { id: '7', name: 'Emma', content: 'Has anyone tried natural remedies for baby colic? Any tips?', likes: 0, comments: [] },
    { id: '8', name: 'David', content: 'What age did your baby start sleeping through the night? Any suggestions?', likes: 0, comments: [] },
    { id: '9', name: 'Sophia', content: 'My toddler has a fever, what’s the best way to manage it? Should I call the doctor?', likes: 0, comments: [] },
    { id: '10', name: 'James', content: 'Has anyone dealt with teething pains in babies? How did you manage it?', likes: 0, comments: [] }
  ]);

  const [commentText, setCommentText] = useState('');
  const [activePost, setActivePost] = useState(null);
  const navigation = useNavigation();

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
        {/* Like Button with Like Count Below */}
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.likeButton}>
          <Text style={{ fontSize: 18 }}>👍</Text>
          <Text style={{ color: 'black', textAlign: 'center', marginTop: 5 }}>{item.likes}</Text>
        </TouchableOpacity>

        {/* Comment Button with Comment Count Below */}
        <TouchableOpacity onPress={() => toggleComments(item.id)} style={styles.commentButton}>
          <Text style={{ fontSize: 18 }}>💬</Text>
          <Text style={{ color: 'black', textAlign: 'center', marginTop: 5 }}>{item.comments.length}</Text>
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

  const navigateToNewPost = () => {
    navigation.navigate('NewPost');
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.flexContainer}
        >
          {/* Input Box */}
          <View style={styles.inputBox}>
            <TouchableOpacity onPress={navigateToNewPost} style={styles.newPostButton}>
              <Text style={{ color: 'white' }}>What's on your mind? 💭</Text>
            </TouchableOpacity>
          </View>

          {/* Post Feed */}
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
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
    flex: 1,
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
    alignItems: 'center',
  },
  commentButton: {
    alignItems: 'center',
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
