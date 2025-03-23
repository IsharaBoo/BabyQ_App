// DoctorProfile.java
package com.BabyQ.MedicalHistory.model; // Adjust package as needed

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DoctorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long doctorId; // Foreign key to Doctor
    private String name;
    private String bio;
    private String email;
    private String license;
    private String specialty;
    private String phone;
    private String workplace;
    private String startYear;
    private String profilePic;
    // Add other relevant fields
}
