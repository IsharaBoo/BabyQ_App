// Review.java
package com.BabyQ.MedicalHistory.model; // Adjust package as needed

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long doctorId; // Foreign key to Doctor
    private Long patientId; // foreign key to patient.
    private String reviewText;
    private int rating;
    private String userName;
    // Add other relevant fields
}

