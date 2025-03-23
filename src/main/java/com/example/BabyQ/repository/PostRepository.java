package com.example.BabyQ.repository;

import com.example.BabyQ.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, String> {
}
