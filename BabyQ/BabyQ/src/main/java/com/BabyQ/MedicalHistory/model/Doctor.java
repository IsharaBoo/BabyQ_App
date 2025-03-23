// Doctor.java
package com.BabyQ.MedicalHistory.model; // Adjust package as needed

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String specialty;
    // Add other relevant fields
}