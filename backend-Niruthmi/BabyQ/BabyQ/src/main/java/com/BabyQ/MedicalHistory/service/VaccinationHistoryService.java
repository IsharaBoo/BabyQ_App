package com.BabyQ.MedicalHistory.service;

import com.BabyQ.MedicalHistory.model.VaccinationHistory;
import com.BabyQ.MedicalHistory.repository.VaccinationHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VaccinationHistoryService {

    @Autowired
    private VaccinationHistoryRepository repository;

    // Get all vaccination history records
    public List<VaccinationHistory> getAllVaccinationHistory() {
        return repository.findAll();
    }

    // Get a single vaccination history record by ID
    public VaccinationHistory getVaccinationHistoryById(Long id) {
        Optional<VaccinationHistory> history = repository.findById(id);
        return history.orElse(null);
    }

    // Add a new vaccination history record
    public VaccinationHistory addVaccinationHistory(VaccinationHistory history) {
        return repository.save(history);
    }

    // Update an existing vaccination history record
    public VaccinationHistory updateVaccinationHistory(VaccinationHistory history) {
        if (repository.existsById(history.getId())) {
            return repository.save(history);
        } else {
            throw new RuntimeException("Vaccination history not found with id: " + history.getId());
        }
    }

    // Delete a vaccination history record by ID
    public void deleteVaccinationHistory(Long id) {
        repository.deleteById(id);
    }
}