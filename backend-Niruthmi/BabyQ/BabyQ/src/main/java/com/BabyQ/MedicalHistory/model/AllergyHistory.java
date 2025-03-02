package com.BabyQ.MedicalHistory.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "allergy_history") // Maps to the "allergy_history" table in the database
public class AllergyHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the ID
    private Long id; // Unique identifier for the allergy history

    @Column(name = "allergy_name", nullable = false) // Maps to the "allergy_name" column
    private String allergyName;

    @Column(name = "reaction", nullable = false) // Maps to the "reaction" column
    private String reaction;

    @Column(name = "last_exposure_date", nullable = false) // Maps to the "last_exposure_date" column
    private LocalDate lastExposureDate;

    // Default constructor (required by JPA)
    public AllergyHistory() {
    }

    // Parameterized constructor (optional, for convenience)
    public AllergyHistory(String allergyName, String reaction, LocalDate lastExposureDate) {
        this.allergyName = allergyName;
        this.reaction = reaction;
        this.lastExposureDate = lastExposureDate;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAllergyName() {
        return allergyName;
    }

    public void setAllergyName(String allergyName) {
        this.allergyName = allergyName;
    }

    public String getReaction() {
        return reaction;
    }

    public void setReaction(String reaction) {
        this.reaction = reaction;
    }

    public LocalDate getLastExposureDate() {
        return lastExposureDate;
    }

    public void setLastExposureDate(LocalDate lastExposureDate) {
        this.lastExposureDate = lastExposureDate;
    }

    // toString method (optional, for debugging)
    @Override
    public String toString() {
        return "AllergyHistory{" +
                "id=" + id +
                ", allergyName='" + allergyName + '\'' +
                ", reaction='" + reaction + '\'' +
                ", lastExposureDate=" + lastExposureDate +
                '}';
    }
}

