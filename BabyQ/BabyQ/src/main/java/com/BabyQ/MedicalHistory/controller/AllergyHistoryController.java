package com.BabyQ.MedicalHistory.controller;

import com.BabyQ.MedicalHistory.model.AllergyHistory;
import com.BabyQ.MedicalHistory.service.AllergyHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
@RestController
@RequestMapping("/api/allergy-history")
public class AllergyHistoryController {

    @Autowired
    private AllergyHistoryService service;

    // Get all allergy history records
    @GetMapping
    public List<AllergyHistory> getAllAllergyHistory() {
        return service.getAllAllergyHistory();
    }

    // Get a single allergy history record by ID
    @GetMapping("/{id}")
    public AllergyHistory getAllergyHistoryById(@PathVariable Long id) {
        return service.getAllergyHistoryById(id);
    }

    // Add a new allergy history record
    @PostMapping
    public AllergyHistory addAllergyHistory(@RequestBody AllergyHistory history) {
        return service.addAllergyHistory(history);
    }

    // Update an existing allergy history record
    @PutMapping
    public AllergyHistory updateAllergyHistory(@RequestBody AllergyHistory history) {
        return service.updateAllergyHistory(history);
    }

    // Delete an allergy history record by ID
    @DeleteMapping("/{id}")
    public String deleteAllergyHistory(@PathVariable Long id) {
        service.deleteAllergyHistory(id);
        return "Allergy history deleted with id: " + id;
    }
}