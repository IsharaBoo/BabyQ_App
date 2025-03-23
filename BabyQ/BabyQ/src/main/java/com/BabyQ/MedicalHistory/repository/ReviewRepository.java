// ReviewRepository.java
package com.BabyQ.MedicalHistory.repository; // Adjust package as needed

import com.BabyQ.MedicalHistory.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByDoctorId(Long doctorId);
}