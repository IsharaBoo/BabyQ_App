package com.example.babyQ_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.babyQ_backend.model.Doctor;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Doctor findByProfessionalEmail(String professionalEmail);
    List<Doctor> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrPositionContainingIgnoreCase(
            String firstName, String lastName, String position
    );
}