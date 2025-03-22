import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, useFocusEffect } from "expo-router";

interface Post {
  id: string;
  name: string;
  content: string;
  likes: number;
  comments: string[];
}

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState("");
  const [activePost, setActivePost] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/posts");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [])
  );

  const handleLike = async (id: string) => {
    if (likedPosts.has(id)) return;

    try {
      const response = await fetch(`http://localhost:8080/api/posts/${id}/like`, {
        method: "PUT",
      });
      if (response.ok) {
        const updatedPost: Post = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? updatedPost : post))
        );
        setLikedPosts((prev) => new Set(prev).add(id));
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const addComment = async (id: string) => {
    if (!commentText.trim()) return;

    try {
      const response = await fetch(`http://localhost:8080/api/posts/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentText),
      });
      if (response.ok) {
        const updatedPost: Post = await response.json();
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === id ? updatedPost : post))
        );
        setCommentText("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const toggleComments = (id: string) => {
    setActivePost(activePost === id ? null : id);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setActivePost(null);
  };

  const renderPost = ({ item }: { item: Post }) => {
    const firstLetter = item.name.charAt(0).toUpperCase();
    const avatarColor = getRandomColor();
    const isLiked = likedPosts.has(item.id);

    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>
          <Text style={styles.postOwner}>{item.name}</Text>
        </View>
        <Text style={styles.postContent}>{item.content}</Text>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => handleLike(item.id)}
            style={styles.likeButton}
            disabled={isLiked}
          >
            <Text style={[styles.actionIcon, { color: isLiked ? "#4B5EFC" : "#333" }]}>
              👍
            </Text>
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleComments(item.id)} style={styles.commentButton}>
            <Text style={[styles.actionIcon, { color: "#333" }]}>💬</Text>
            <Text style={styles.actionText}>{item.comments.length}</Text>
          </TouchableOpacity>
        </View>

        {activePost === item.id && (
          <View style={styles.commentSection}>
            <FlatList
              data={item.comments}
              keyExtractor={(comment, index) => index.toString()}
              renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
            />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.commentInputContainer}
            >
              <TextInput
                style={styles.commentInput}
                placeholder="Write a comment..."
                placeholderTextColor="#A0AEC0"
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity onPress={() => addComment(item.id)} style={styles.commentPostButton}>
                <Text style={styles.commentPostText}>Post</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        )}
      </View>
    );
  };

  const navigateToNewPost = () => {
    router.push("./NewPost");
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.flexContainer}
        >
          <View style={styles.inputBox}>
            <TouchableOpacity onPress={navigateToNewPost} style={styles.newPostButton}>
              <Text style={styles.newPostText}>What's on your mind? 💭</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FAFD", 
    paddingTop: 60, 
  },
  flexContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  inputBox: {
    width: 300, 
    height: 50, 
    backgroundColor: "#4B5EFC", 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20, 
    marginBottom: 25, 
    borderWidth: 1, 
    borderColor: "#FFFFFF", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  newPostButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  newPostText: {
    color: "#FFFFFF",
    fontSize: 18, 
    fontWeight: "600", 
    letterSpacing: 0.5,
  },
  postContainer: {
    width: 350, 
    backgroundColor: "#FFFFFF", 
    padding: 20, 
    borderRadius: 15, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: "#E2E8F0", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 45, 
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    borderWidth: 2, 
    borderColor: "#FFFFFF",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 22, 
    fontWeight: "bold",
  },
  postOwner: {
    fontWeight: "700", 
    fontSize: 17, 
    color: "#1A202C", 
  },
  postContent: {
    fontSize: 18, 
    color: "#2D3748", 
    marginBottom: 15,
    lineHeight: 24, 
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  likeButton: {
    alignItems: "center",
    padding: 5,
  },
  commentButton: {
    alignItems: "center",
    padding: 5,
  },
  actionIcon: {
    fontSize: 24, 
  },
  actionText: {
    color: "#4B5EFC", 
    fontSize: 14,
    marginTop: 5,
    fontWeight: "500",
  },
  commentSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#F1F5F9", 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  comment: {
    fontSize: 15, 
    padding: 8,
    backgroundColor: "#FFFFFF",
    marginVertical: 3,
    borderRadius: 8,
    color: "#2D3748", 
  },
  commentInputContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  commentInput: {
    flex: 1,
    padding: 5,
    fontSize: 15,
    color: "#1A202C",
  },
  commentPostButton: {
    backgroundColor: "#4B5EFC", 
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  commentPostText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});