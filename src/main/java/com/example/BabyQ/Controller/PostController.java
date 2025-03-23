package com.example.BabyQ.Controller;
import com.example.BabyQ.model.Post;
import com.example.BabyQ.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*") // Adjust this based on your frontend URL
public class PostController {

    @Autowired
    private PostRepository postRepository;

    // Create
    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postRepository.save(post);
    }

    // Read (All)
    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // Read (Single)
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        Optional<Post> post = postRepository.findById(id);
        return post.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update (Like)
    @PutMapping("/{id}/like")
    public ResponseEntity<Post> likePost(@PathVariable String id) {
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setLikes(post.getLikes() + 1);
            return ResponseEntity.ok(postRepository.save(post));
        }
        return ResponseEntity.notFound().build();
    }

    // Update (Add Comment)
    @PostMapping("/{id}/comment")
    public ResponseEntity<Post> addComment(@PathVariable String id, @RequestBody String comment) {
        Optional<Post> postOptional = postRepository.findById(id);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.getComments().add(comment);
            return ResponseEntity.ok(postRepository.save(post));
        }
        return ResponseEntity.notFound().build();
    }
    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}