package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Doctor;
import java.util.List;

public interface DoctorService {
    Doctor registerDoctor(Doctor provider);
    List<Doctor> getAllDoctors(); // Add this method
    void deleteDoctor(Long id) throws IllegalArgumentException; // Throws if not found
    Doctor updateDoctor(Doctor doctor) throws IllegalArgumentException;
    Doctor getDoctorById(Long id);
    boolean emailExists(String email);
    Doctor loginDoctor(String email, String password);
    List<Doctor> searchDoctors(String query);
}
