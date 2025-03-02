package com.BabyQ.MedicalHistory.service;

import com.BabyQ.MedicalHistory.model.AllergyHistory;
import com.BabyQ.MedicalHistory.repository.AllergyHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AllergyHistoryService {

    @Autowired
    private AllergyHistoryRepository repository;

    // Get all allergy history records
    public List<AllergyHistory> getAllAllergyHistory() {
        return repository.findAll();
    }

    // Get a single allergy history record by ID
    public AllergyHistory getAllergyHistoryById(Long id) {
        Optional<AllergyHistory> history = repository.findById(id);
        return history.orElse(null);
    }

    // Add a new allergy history record
    public AllergyHistory addAllergyHistory(AllergyHistory history) {
        return repository.save(history);
    }

    // Update an existing allergy history record
    public AllergyHistory updateAllergyHistory(AllergyHistory history) {
        if (repository.existsById(history.getId())) {
            return repository.save(history);
        } else {
            throw new RuntimeException("Allergy history not found with id: " + history.getId());
        }
    }

    // Delete an allergy history record by ID
    public void deleteAllergyHistory(Long id) {
        repository.deleteById(id);
    }
}
