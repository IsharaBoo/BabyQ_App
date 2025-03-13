package com.example.babyQ_backend.controller;

import com.example.babyQ_backend.model.Doctor;
import com.example.babyQ_backend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController_D {
    @Autowired
    private DoctorService doctorService; // Use the interface

    @PostMapping
    public Doctor registerDoctor(@RequestBody Doctor doctor) {
        return doctorService.registerDoctor(doctor);
    }
    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

}