package com.example.babyQ_backend.model;

import jakarta.persistence.*;

@Entity
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String nicNumber;
    private String professionalEmail;
    private String password;
    private String phoneNumber;
    private String medicalLicenseNumber;
    private String affiliatedHospital;
    private String workplaceAddress;
    private String position;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getNicNumber() { return nicNumber; }
    public void setNicNumber(String nicNumber) { this.nicNumber = nicNumber; }

    public String getProfessionalEmail() { return professionalEmail; }
    public void setProfessionalEmail(String professionalEmail) { this.professionalEmail = professionalEmail; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getMedicalLicenseNumber() { return medicalLicenseNumber; }
    public void setMedicalLicenseNumber(String medicalLicenseNumber) { this.medicalLicenseNumber = medicalLicenseNumber; }

    public String getAffiliatedHospital() { return affiliatedHospital; }
    public void setAffiliatedHospital(String affiliatedHospital) { this.affiliatedHospital = affiliatedHospital; }

    public String getWorkplaceAddress() { return workplaceAddress; }
    public void setWorkplaceAddress(String workplaceAddress) { this.workplaceAddress = workplaceAddress; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }
}