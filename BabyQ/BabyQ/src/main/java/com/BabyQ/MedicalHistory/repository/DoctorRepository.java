// DoctorRepository.java
package com.BabyQ.MedicalHistory.repository;

import com.BabyQ.MedicalHistory.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // You can add custom query methods here if needed
}
