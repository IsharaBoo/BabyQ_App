package com.BabyQ.MedicalHistory.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "vaccination_history") // Maps to the "vaccination_history" table in the database
public class VaccinationHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the ID
    private Long id; // Unique identifier for the vaccination history

    @Column(name = "vaccine_name", nullable = false) // Maps to the "vaccine_name" column
    private String vaccineName;

    @Column(name = "date", nullable = false) // Maps to the "date" column
    private LocalDate date;

    @Column(name = "notes") // Maps to the "notes" column
    private String notes;

    // Default constructor (required by JPA)
    public VaccinationHistory() {
    }

    // Parameterized constructor (optional, for convenience)
    public VaccinationHistory(String vaccineName, LocalDate date, String notes) {
        this.vaccineName = vaccineName;
        this.date = date;
        this.notes = notes;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVaccineName() {
        return vaccineName;
    }

    public void setVaccineName(String vaccineName) {
        this.vaccineName = vaccineName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    // toString method (optional, for debugging)
    @Override
    public String toString() {
        return "VaccinationHistory{" +
                "id=" + id +
                ", vaccineName='" + vaccineName + '\'' +
                ", date=" + date +
                ", notes='" + notes + '\'' +
                '}';
    }
}
