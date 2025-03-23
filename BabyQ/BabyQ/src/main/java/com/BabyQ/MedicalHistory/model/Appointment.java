// Appointment.java
package com.BabyQ.MedicalHistory.model; // Adjust package as needed

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long patientId; // Foreign key to Patient
    private Long doctorId; // Foreign key to Doctor
    private LocalDateTime appointmentDateTime;
    private String notes;
    // Add other relevant fields
}
