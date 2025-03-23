package com.BabyQ.MedicalHistory.service;//package com.BabyQ.MedicalHistory.service;
//
//import com.BabyQ.MedicalHistory.model.Report;
//import com.BabyQ.MedicalHistory.repository.ReportRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.List;
//
//@Service
//public class ReportService {
//
//    @Autowired
//    private ReportRepository repository;
//
//    private static final String UPLOAD_DIR = "uploads/"; // Consistent with controller
//
//    public List<Report> getAllReports() {
//        return repository.findAll();
//    }
//
//    public Report uploadReport(String reportName, MultipartFile file) throws IOException {
//        // Save file to server
//        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
//        File dest = new File(UPLOAD_DIR + fileName);
//        file.transferTo(dest);
//
//        // Save report metadata
//        Report report = new Report();
//        report.setReportName(reportName);
//        report.setFilePath(dest.getPath());
//        return repository.save(report);
//    }
//}
