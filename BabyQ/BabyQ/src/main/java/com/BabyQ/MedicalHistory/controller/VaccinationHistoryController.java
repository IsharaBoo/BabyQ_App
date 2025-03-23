package com.BabyQ.MedicalHistory.controller;

import com.BabyQ.MedicalHistory.model.VaccinationHistory;
import com.BabyQ.MedicalHistory.service.VaccinationHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:19006") // Allow requests from React Native frontend
@RestController
@RequestMapping("/api/vaccination-history")
public class VaccinationHistoryController {

    @Autowired
    private VaccinationHistoryService service;

    // Get all vaccination history records
    @GetMapping
    public List<VaccinationHistory> getAllVaccinationHistory() {
        return service.getAllVaccinationHistory();
    }

    // Get a single vaccination history record by ID
    @GetMapping("/{id}")
    public VaccinationHistory getVaccinationHistoryById(@PathVariable Long id) {
        return service.getVaccinationHistoryById(id);
    }

    // Add a new vaccination history record
    @PostMapping
    public VaccinationHistory addVaccinationHistory(@RequestBody VaccinationHistory history) {
        return service.addVaccinationHistory(history);
    }

    // Update an existing vaccination history record
    @PutMapping
    public VaccinationHistory updateVaccinationHistory(@RequestBody VaccinationHistory history) {
        return service.updateVaccinationHistory(history);
    }

    // Delete a vaccination history record by ID
    @DeleteMapping("/{id}")
    public String deleteVaccinationHistory(@PathVariable Long id) {
        service.deleteVaccinationHistory(id);
        return "Vaccination history deleted with id: " + id;
    }
}