////package com.BabyQ.MedicalHistory.model;
////
////import jakarta.persistence.*;
////import lombok.Data;
////import lombok.NoArgsConstructor;
////import java.time.LocalDate;
////
////@Data
////@NoArgsConstructor
////@Entity
////@Table(name = "channeling_history") // Use jakarta.persistence.Table
////public class ChannelingHistory {
////
////    public enum Status {
////        SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
////    }
////
////    @Id
////    @GeneratedValue(strategy = GenerationType.IDENTITY)
////    private Long id;  // Unique identifier for the channeling history
////
////    @Column(name = "doctor_name", nullable = false)
////    private String doctorName;
////
////    @Column(name = "specialty", nullable = false)
////    private String specialty;
////
////    @Column(name = "appointment_date", nullable = false)
////    private LocalDate appointmentDate;
////
////    @Column(name = "doctor_notes")
////    private String doctorNotes;
////
////    @Column(name = "medical_conditions")
////    private String medicalConditions;
////
////    @Column(name = "symptoms")
////    private String symptoms;
////
////    @Enumerated(EnumType.STRING)
////    @Column(name = "status")
////    private Status status = Status.SCHEDULED;  // Default status for appointments
////
////    // Getters and Setters
////    public Long getId() {
////        return id;
////    }
////
////    public void setId(Long id) {
////        this.id = id;
////    }
////
////    public String getDoctorName() {
////        return doctorName;
////    }
////
////    public void setDoctorName(String doctorName) {
////        this.doctorName = doctorName;
////    }
////
////    public String getSpecialty() {
////        return specialty;
////    }
////
////    public void setSpecialty(String specialty) {
////        this.specialty = specialty;
////    }
////
////    public LocalDate getAppointmentDate() {
////        return appointmentDate;
////    }
////
////    public void setAppointmentDate(LocalDate appointmentDate) {
////        this.appointmentDate = appointmentDate;
////    }
////
////    public String getDoctorNotes() {
////        return doctorNotes;
////    }
////
////    public void setDoctorNotes(String doctorNotes) {
////        this.doctorNotes = doctorNotes;
////    }
////
////    public String getMedicalConditions() {
////        return medicalConditions;
////    }
////
////    public void setMedicalConditions(String medicalConditions) {
////        this.medicalConditions = medicalConditions;
////    }
////
////    public String getSymptoms() {
////        return symptoms;
////    }
////
////    public void setSymptoms(String symptoms) {
////        this.symptoms = symptoms;
////    }
////
////    public Status getStatus() {
////        return status;
////    }
////
////    public void setStatus(Status status) {
////        this.status = status;
////    }
////
////    // Method for updating status
////    public boolean updateStatus(Status newStatus) {
////        if (newStatus != null) {
////            this.status = newStatus;
////            return true;
////        }
////        return false;
////    }
////
//package com.BabyQ.MedicalHistory.model;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//
//@Entity
//public class ChannelingHistory {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String doctorName;
//    private String specialty;
//    private String appointmentDate;
//    private String doctorNotes;
//    private String medicalConditions;
//    private String symptoms;
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
//    public String getAppointmentDate() {
//        return appointmentDate;
//    }
//
//    public void setAppointmentDate(String appointmentDate) {
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
//}
package com.BabyQ.MedicalHistory.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "channeling_history") // Maps to the "channeling_history" table in the database
public class ChannelingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the ID
    private Long id; // Unique identifier for the channeling history

    @Column(name = "doctor_name", nullable = false) // Maps to the "doctor_name" column
    private String doctorName;

    @Column(name = "specialty", nullable = false) // Maps to the "specialty" column
    private String specialty;

    @Column(name = "appointment_date", nullable = false) // Maps to the "appointment_date" column
    private LocalDate appointmentDate;

    @Column(name = "doctor_notes") // Maps to the "doctor_notes" column
    private String doctorNotes;

    @Column(name = "medical_conditions") // Maps to the "medical_conditions" column
    private String medicalConditions;

    @Column(name = "symptoms") // Maps to the "symptoms" column
    private String symptoms;

    // Default constructor (required by JPA)
    public ChannelingHistory() {
    }

    // Parameterized constructor (optional, for convenience)
    public ChannelingHistory(String doctorName, String specialty, LocalDate appointmentDate, String doctorNotes, String medicalConditions, String symptoms) {
        this.doctorName = doctorName;
        this.specialty = specialty;
        this.appointmentDate = appointmentDate;
        this.doctorNotes = doctorNotes;
        this.medicalConditions = medicalConditions;
        this.symptoms = symptoms;
    }

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

    public LocalDate getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDate appointmentDate) {
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

    // toString method (optional, for debugging)
    @Override
    public String toString() {
        return "ChannelingHistory{" +
                "id=" + id +
                ", doctorName='" + doctorName + '\'' +
                ", specialty='" + specialty + '\'' +
                ", appointmentDate=" + appointmentDate +
                ", doctorNotes='" + doctorNotes + '\'' +
                ", medicalConditions='" + medicalConditions + '\'' +
                ", symptoms='" + symptoms + '\'' +
                '}';
    }
}