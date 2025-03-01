//package com.BabyQ.MedicalHistory.model;
//
//import jakarta.persistence.*;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import java.time.LocalDate;
//
//@Data
//@NoArgsConstructor
//@Entity
//@Table(name = "channeling_history") // Use jakarta.persistence.Table
//public class ChannelingHistory {
//
//    public enum Status {
//        SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
//    }
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;  // Unique identifier for the channeling history
//
//    @Column(name = "doctor_name", nullable = false)
//    private String doctorName;
//
//    @Column(name = "specialty", nullable = false)
//    private String specialty;
//
//    @Column(name = "appointment_date", nullable = false)
//    private LocalDate appointmentDate;
//
//    @Column(name = "doctor_notes")
//    private String doctorNotes;
//
//    @Column(name = "medical_conditions")
//    private String medicalConditions;
//
//    @Column(name = "symptoms")
//    private String symptoms;
//
//    @Enumerated(EnumType.STRING)
//    @Column(name = "status")
//    private Status status = Status.SCHEDULED;  // Default status for appointments
//
//    // Getters and Setters
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getDoctorName() {
//        return doctorName;
//    }
//
//    public void setDoctorName(String doctorName) {
//        this.doctorName = doctorName;
//    }
//
//    public String getSpecialty() {
//        return specialty;
//    }
//
//    public void setSpecialty(String specialty) {
//        this.specialty = specialty;
//    }
//
//    public LocalDate getAppointmentDate() {
//        return appointmentDate;
//    }
//
//    public void setAppointmentDate(LocalDate appointmentDate) {
//        this.appointmentDate = appointmentDate;
//    }
//
//    public String getDoctorNotes() {
//        return doctorNotes;
//    }
//
//    public void setDoctorNotes(String doctorNotes) {
//        this.doctorNotes = doctorNotes;
//    }
//
//    public String getMedicalConditions() {
//        return medicalConditions;
//    }
//
//    public void setMedicalConditions(String medicalConditions) {
//        this.medicalConditions = medicalConditions;
//    }
//
//    public String getSymptoms() {
//        return symptoms;
//    }
//
//    public void setSymptoms(String symptoms) {
//        this.symptoms = symptoms;
//    }
//
//    public Status getStatus() {
//        return status;
//    }
//
//    public void setStatus(Status status) {
//        this.status = status;
//    }
//
//    // Method for updating status
//    public boolean updateStatus(Status newStatus) {
//        if (newStatus != null) {
//            this.status = newStatus;
//            return true;
//        }
//        return false;
//    }
//}




















package com.BabyQ.MedicalHistory.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ChannelingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String doctorName;
    private String specialty;
    private String appointmentDate;
    private String doctorNotes;
    private String medicalConditions;
    private String symptoms;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getDoctorNotes() {
        return doctorNotes;
    }

    public void setDoctorNotes(String doctorNotes) {
        this.doctorNotes = doctorNotes;
    }

    public String getMedicalConditions() {
        return medicalConditions;
    }

    public void setMedicalConditions(String medicalConditions) {
        this.medicalConditions = medicalConditions;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }
}
