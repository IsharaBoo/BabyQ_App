package com.example.babyQ_backend.controller;

import com.example.babyQ_backend.dto.DoctorDTO;
import com.example.babyQ_backend.model.Doctor;
import com.example.babyQ_backend.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = {"http://localhost:8081", "*"})
public class DoctorController_D {
    @Autowired
    private DoctorService doctorService;

    @PostMapping("/register")
    public ResponseEntity<DoctorDTO> registerDoctor(@RequestBody DoctorDTO doctorDTO) {
        try {
            Doctor doctor = mapToEntity(doctorDTO);
            Doctor registeredDoctor = doctorService.registerDoctor(doctor);
            return ResponseEntity.ok(mapToDTO(registeredDoctor));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = "uploads/";
            Files.createDirectories(Paths.get(uploadDir));
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir + fileName);
            Files.write(filePath, file.getBytes());
            String fileUrl = "http://localhost:8082/" + uploadDir + fileName;
            return ResponseEntity.ok(Map.of("url", fileUrl));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Upload failed"));
        }
    }

    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        try {
            List<Doctor> doctors = doctorService.getAllDoctors();
            List<DoctorDTO> doctorDTOs = doctors.stream().map(this::mapToDTO).toList();
            return ResponseEntity.ok(doctorDTOs);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @GetMapping("/search")
    public ResponseEntity<List<Doctor>> searchDoctors(@RequestParam("query") String query) {
        System.out.println("Searching for..: " + query); // Debug log
        List<Doctor> results = doctorService.searchDoctors(query);
        return ResponseEntity.ok(results);
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        try {
            Doctor doctor = doctorService.getDoctorById(id);
            return ResponseEntity.ok(mapToDTO(doctor));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Doctor with ID " + id + " not found");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while retrieving doctor.");
        }
    }
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        try {
            boolean exists = doctorService.emailExists(email);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(false);
        }
    }


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

    @PutMapping("/{id}")
    public ResponseEntity<DoctorDTO> updateDoctor(@PathVariable Long id, @RequestBody DoctorDTO doctorDTO) {
        try {
            Doctor doctor = mapToEntity(doctorDTO);
            doctor.setId(id);
            Doctor updatedDoctor = doctorService.updateDoctor(doctor);
            return ResponseEntity.ok(mapToDTO(updatedDoctor));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    // New Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginDoctor(@RequestBody Map<String, String> loginRequest) {
        try {
            String email = loginRequest.get("professionalEmail");
            String password = loginRequest.get("password");
            Doctor doctor = doctorService.loginDoctor(email, password);
            if (doctor != null) {
                return ResponseEntity.ok(mapToDTO(doctor));
            } else {
                return ResponseEntity.status(401).body("Invalid email or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

    private DoctorDTO mapToDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setId(doctor.getId());
        dto.setFirstName(doctor.getFirstName());
        dto.setLastName(doctor.getLastName());
        dto.setNicNumber(doctor.getNicNumber());
        dto.setProfessionalEmail(doctor.getProfessionalEmail());
        dto.setPassword(doctor.getPassword());
        dto.setPhoneNumber(doctor.getPhoneNumber());
        dto.setMedicalLicenseNumber(doctor.getMedicalLicenseNumber());
        dto.setAffiliatedHospital(doctor.getAffiliatedHospital());
        dto.setWorkplaceAddress(doctor.getWorkplaceAddress());
        dto.setPosition(doctor.getPosition());
        dto.setDocumentUrl(doctor.getDocumentUrl());
        dto.setRegistrationDate(doctor.getRegistrationDate());
        return dto;
    }

    private Doctor mapToEntity(DoctorDTO dto) {
        Doctor doctor = new Doctor();
        doctor.setFirstName(dto.getFirstName());
        doctor.setLastName(dto.getLastName());
        doctor.setNicNumber(dto.getNicNumber());
        doctor.setProfessionalEmail(dto.getProfessionalEmail());
        doctor.setPassword(dto.getPassword());
        doctor.setPhoneNumber(dto.getPhoneNumber());
        doctor.setMedicalLicenseNumber(dto.getMedicalLicenseNumber());
        doctor.setAffiliatedHospital(dto.getAffiliatedHospital());
        doctor.setWorkplaceAddress(dto.getWorkplaceAddress());
        doctor.setPosition(dto.getPosition());
        doctor.setDocumentUrl(dto.getDocumentUrl());
        return doctor;
    }
}