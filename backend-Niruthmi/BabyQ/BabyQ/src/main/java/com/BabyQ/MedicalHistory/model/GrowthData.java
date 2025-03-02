package com.BabyQ.MedicalHistory.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "growth_data") // Maps to the "growth_data" table in the database
public class GrowthData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate the ID
    private Long id; // Unique identifier for the growth data

    @Column(name = "weight", nullable = false) // Maps to the "weight" column
    private double weight;

    @Column(name = "height", nullable = false) // Maps to the "height" column
    private double height;


    @Column(name = "age", nullable = false) // Maps to the "height" column
    private double age;

    @Column(name = "date", nullable = false) // Maps to the "date" column
    private LocalDate date;

    // Default constructor (required by JPA)
    public GrowthData() {
    }

    // Parameterized constructor (optional, for convenience)
    public GrowthData(double weight, double height, double age, LocalDate date) {
        this.weight = weight;
        this.height = height;
        this.age=age;
        this.date = date;

    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getAge() {
        return age;
    }

    public void setAge(double age) {
        this.age = age;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    // toString method (optional, for debugging)
    @Override
    public String toString() {
        return "GrowthData{" +
                "id=" + id +
                ", weight=" + weight +
                ", height=" + height +
                ", age=" + age +
                ", date=" + date +
                '}';
    }
}
