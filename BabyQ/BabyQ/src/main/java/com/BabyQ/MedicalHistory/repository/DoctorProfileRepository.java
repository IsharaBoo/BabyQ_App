// DoctorProfileRepository.java
package com.BabyQ.MedicalHistory.repository; // Adjust package as needed

import com.BabyQ.MedicalHistory.model.DoctorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorProfileRepository extends JpaRepository<DoctorProfile, Long> {
    Optional<DoctorProfile> findByDoctorId(Long doctorId);
}