
package com.BabyQ.MedicalHistory.controller; // Adjust package as needed

import com.BabyQ.MedicalHistory.model.Review; // Assuming Review model is in this package
import com.BabyQ.MedicalHistory.service.ReviewService; // Assuming ReviewService is in this package
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
@RestController
@RequestMapping("/api/reviews") // Adjust path as needed
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id);
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewService.addReview(review);
    }

    @PutMapping
    public Review updateReview(@RequestBody Review review) {
        return reviewService.updateReview(review);
    }

    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return "Review deleted with id: " + id;
    }

    @GetMapping("/doctor/{doctorId}")
    public List<Review> getReviewsByDoctorId(@PathVariable Long doctorId) {
        return reviewService.getReviewsByDoctorId(doctorId);
    }
}