import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router"; // No need for useLocalSearchParams

export default function NewPost() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const dismissKeyboard = () => {
    if (Platform.OS !== "web") {
      Keyboard.dismiss();
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handlePost = async () => {
    if (!name.trim() || !content.trim()) return;

    try {
      const response = await fetch("http://localhost:8082/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, content }),
      });

      if (response.ok) {
        router.back(); // Just go back, fetchPosts runs in CommunityPage
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const ContentWrapper = Platform.OS === "web" ? SafeAreaView : SafeAreaView;
  const wrapperProps = { style: styles.container };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ContentWrapper {...wrapperProps}>
        {Platform.OS !== "web" ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flexContainer}
          >
            <View style={styles.background}>
              <View style={styles.content}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                  <View style={styles.backButtonCircle}>
                    <Text style={styles.backButtonText}>←</Text>
                  </View>
                </TouchableOpacity>

                <Text style={styles.title}>Create a New Post</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor="#A0AEC0"
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  style={[styles.input, styles.contentInput]}
                  placeholder="What's on your mind?"
                  placeholderTextColor="#A0AEC0"
                  multiline
                  value={content}
                  onChangeText={setContent}
                />

                <TouchableOpacity onPress={handlePost} style={styles.postButton}>
                  <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        ) : (
          <View style={styles.background}>
            <View style={styles.content}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <View style={styles.backButtonCircle}>
                  <Text style={styles.backButtonText}>←</Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.title}>Create a New Post</Text>

              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor="#A0AEC0"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={[styles.input, styles.contentInput]}
                placeholder="What's on your mind?"
                placeholderTextColor="#A0AEC0"
                multiline
                value={content}
                onChangeText={setContent}
              />

              <TouchableOpacity onPress={handlePost} style={styles.postButton}>
                <Text style={styles.postButtonText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ContentWrapper>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexContainer: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "#F0F4F8",
    justifyContent: "flex-start",
  },
  content: {
    padding: 25,
    width: "100%",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
    marginTop: Platform.OS === "ios" ? 0 : 10,
  },
  backButtonCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#4B5EFC",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  backButtonText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    lineHeight: 22,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1A202C",
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: Platform.OS === "web" ? 0 : 3,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  contentInput: {
    height: 170,
    textAlignVertical: "top",
  },
  postButton: {
    backgroundColor: "#4B5EFC",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: Platform.OS === "web" ? 0 : 6,
  },
  postButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});