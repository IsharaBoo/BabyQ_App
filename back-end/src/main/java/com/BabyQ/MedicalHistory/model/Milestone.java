package com.BabyQ.MedicalHistory.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "milestones")
public class Milestone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String age;
    private String category;
    private String item;
    private LocalDate completionDate;

    // Constructors
    public Milestone() {}

    public Milestone(String age, String category, String item, LocalDate completionDate) {
        this.age = age;
        this.category = category;
        this.item = item;
        this.completionDate = completionDate;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getItem() { return item; }
    public void setItem(String item) { this.item = item; }

    public LocalDate getCompletionDate() { return completionDate; }
    public void setCompletionDate(LocalDate completionDate) { this.completionDate = completionDate; }
}
