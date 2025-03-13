package com.example.babyQ_backend.controller;

import com.example.babyQ_backend.model.Doctor;
import com.example.babyQ_backend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController_D {
    @Autowired
    private DoctorService doctorService; // Use the interface

    // POST endpoint to register a doctor
    @PostMapping
    public Doctor registerDoctor(@RequestBody Doctor doctor) {
        return doctorService.registerDoctor(doctor);
    }

    // GET endpoint to retrieve all doctors
    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // DELETE endpoint to remove a doctor by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(@PathVariable Long id) {
        try {
            doctorService.deleteDoctor(id);
            return ResponseEntity.ok("Doctor with ID " + id + " deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Doctor with ID " + id + " not found");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting doctor: " + e.getMessage());
        }
    }

    // PUT endpoint to update a doctor by ID
    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
        try {
            doctor.setId(id); // Set the ID from the path variable
            Doctor updatedDoctor = doctorService.updateDoctor(doctor);
            return ResponseEntity.ok(updatedDoctor);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(null); // Doctor not found
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Other errors
        }
    }
}