package com.example.babyQ_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.babyQ_backend.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}