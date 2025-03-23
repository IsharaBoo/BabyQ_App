package com.BabyQ.MedicalHistory.model;//package com.BabyQ.MedicalHistory.model;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//
//@Entity
//public class Report {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String reportName;
//    private String filePath; // Store file location
//
//    // Constructors
//    public Report() {}
//
//    // Getters and Setters
//    public Long getId() { return id; }
//    public void setId(Long id) { this.id = id; }
//    public String getReportName() { return reportName; }
//    public void setReportName(String reportName) { this.reportName = reportName; }
//    public String getFilePath() { return filePath; }
//    public void setFilePath(String filePath) { this.filePath = filePath; }
//}