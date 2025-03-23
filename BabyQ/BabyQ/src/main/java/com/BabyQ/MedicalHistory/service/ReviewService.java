// ReviewService.java
package com.BabyQ.MedicalHistory.service;

import com.BabyQ.MedicalHistory.model.Review;
import com.BabyQ.MedicalHistory.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    public List<Review> getAllReviews() {
        return repository.findAll();
    }

    public Review getReviewById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Review addReview(Review review) {
        return repository.save(review);
    }

    public Review updateReview(Review review) {
        return repository.save(review);
    }

    public void deleteReview(Long id) {
        repository.deleteById(id);
    }

    public List<Review> getReviewsByDoctorId(Long doctorId) {
        return repository.findByDoctorId(doctorId);
    }
}