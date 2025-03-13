package com.example.babyQ_backend.dto;

import java.time.LocalDate;

public class ParentDTO {
    private String fullName;
    private String nicNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String phoneNumber;
    private String email;       // For the login purpose
    private String password;

    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getNicNumber() { return nicNumber; }
    public void setNicNumber(String nicNumber) { this.nicNumber = nicNumber; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }       // Ensure this is included
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; } // Ensure this is included
    public void setPassword(String password) { this.password = password; }
}