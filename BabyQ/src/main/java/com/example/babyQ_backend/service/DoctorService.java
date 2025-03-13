package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Doctor;
import java.util.List;

public interface DoctorService {
    Doctor registerDoctor(Doctor provider);
    List<Doctor> getAllDoctors(); // Add this method
}
