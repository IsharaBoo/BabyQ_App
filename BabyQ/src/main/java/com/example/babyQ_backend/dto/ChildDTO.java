package com.example.babyQ_backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class ChildDTO {
    private String name;
    private String birthCNo;
    private String gender;
    private String bloodGroup;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") // Ensures correct JSON parsing
    private LocalDate dob;

    private String allergies;
    private int age;
    private double weight;
    private double height;
    private String additionalDetails;
    private Long parentId;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBirthCNo() { return birthCNo; }
    public void setBirthCNo(String birthCNo) { this.birthCNo = birthCNo; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public String getAllergies() { return allergies; }
    public void setAllergies(String allergies) { this.allergies = allergies; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public double getWeight() { return weight; }
    public void setWeight(double weight) { this.weight = weight; }

    public double getHeight() { return height; }
    public void setHeight(double height) { this.height = height; }

    public String getAdditionalDetails() { return additionalDetails; }
    public void setAdditionalDetails(String additionalDetails) { this.additionalDetails = additionalDetails; }

    public Long getParentId() { return parentId; }
    public void setParentId(Long parentId) { this.parentId = parentId; }

    @Override
    public String toString() {
        return "ChildDTO{" +
                "name='" + name + '\'' +
                ", birthCNo='" + birthCNo + '\'' +
                ", dob=" + dob +
                ", gender='" + gender + '\'' +
                ", bloodGroup='" + bloodGroup + '\'' +
                ", allergies='" + allergies + '\'' +
                ", age=" + age +
                ", weight=" + weight +
                ", height=" + height +
                ", additionalDetails='" + additionalDetails + '\'' +
                ", parentId=" + parentId +
                '}';
    }
}
