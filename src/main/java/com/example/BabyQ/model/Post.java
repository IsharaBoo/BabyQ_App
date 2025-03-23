package com.example.BabyQ.model;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;
    private String content;
    private int likes = 0;

    @ElementCollection
    private List<String> comments = new ArrayList<>();

    // Constructors
    public Post() {}

    public Post(String name, String content) {
        this.name = name;
        this.content = content;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }
    public List<String> getComments() { return comments; }
    public void setComments(List<String> comments) { this.comments = comments; }
}
