package com.babyq.babyq.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "baby_development")
public class BabyDevelopment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "baby_id", nullable = false)
    private Baby baby;

    @ManyToOne
    @JoinColumn(name = "milestone_id", nullable = false)
    private Milestone milestone;

    private LocalDate dateAchieved;

    private String notes;

    public BabyDevelopment() {
    }

    public BabyDevelopment(Baby baby, Milestone milestone, LocalDate dateAchieved, String notes) {
        this.baby = baby;
        this.milestone = milestone;
        this.dateAchieved = dateAchieved;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Baby getBaby() {
        return baby;
    }

    public void setBaby(Baby baby) {
        this.baby = baby;
    }

    public Milestone getMilestone() {
        return milestone;
    }

    public void setMilestone(Milestone milestone) {
        this.milestone = milestone;
    }

    public LocalDate getDateAchieved() {
        return dateAchieved;
    }

    public void setDateAchieved(LocalDate dateAchieved) {
        this.dateAchieved = dateAchieved;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
