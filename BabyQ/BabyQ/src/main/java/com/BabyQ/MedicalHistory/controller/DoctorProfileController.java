package com.BabyQ.MedicalHistory.controller; // Adjust package as needed

import com.BabyQ.MedicalHistory.model.DoctorProfile; // Assuming DoctorProfile model is in this package
import com.BabyQ.MedicalHistory.service.DoctorProfileService; // Assuming DoctorProfileService is in this package
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
@RestController
@RequestMapping("/api/doctor-profiles") // Adjust path as needed
public class DoctorProfileController {

    @Autowired
    private DoctorProfileService doctorProfileService;

    @GetMapping("/{doctorId}")
    public ResponseEntity<DoctorProfile> getDoctorProfileByDoctorId(@PathVariable Long doctorId) {
        Optional<DoctorProfile> profile = doctorProfileService.getDoctorProfileByDoctorId(doctorId);
        return profile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DoctorProfile> createOrUpdateDoctorProfile(@RequestBody DoctorProfile doctorProfile) {
        DoctorProfile savedProfile = doctorProfileService.saveDoctorProfile(doctorProfile);
        return new ResponseEntity<>(savedProfile, HttpStatus.OK);
    }

    // You might not need delete or getAll in this case, but here they are if needed

    @GetMapping
    public java.util.List<DoctorProfile> getAllDoctorProfiles() {
        return doctorProfileService.getAllDoctorProfiles();
    }

    @DeleteMapping("/{doctorId}")
    public ResponseEntity<String> deleteDoctorProfile(@PathVariable Long doctorId) {
        doctorProfileService.deleteDoctorProfile(doctorId);
        return new ResponseEntity<>("Doctor profile deleted", HttpStatus.OK);
    }
}
