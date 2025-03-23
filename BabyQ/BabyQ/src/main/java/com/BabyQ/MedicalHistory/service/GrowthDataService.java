package com.BabyQ.MedicalHistory.service;

import com.BabyQ.MedicalHistory.model.GrowthData;
import com.BabyQ.MedicalHistory.repository.GrowthDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GrowthDataService {

    @Autowired
    private GrowthDataRepository repository;

    // Get all growth data records
    public List<GrowthData> getAllGrowthData() {
        return repository.findAll();
    }

    // Get a single growth data record by ID
    public GrowthData getGrowthDataById(Long id) {
        Optional<GrowthData> data = repository.findById(id);
        return data.orElse(null);
    }

    // Add a new growth data record
    public GrowthData addGrowthData(GrowthData data) {
        return repository.save(data);
    }

    // Update an existing growth data record
    public GrowthData updateGrowthData(GrowthData data) {
        if (repository.existsById(data.getId())) {
            return repository.save(data);
        } else {
            throw new RuntimeException("Growth data not found with id: " + data.getId());
        }
    }

    // Delete a growth data record by ID
    public void deleteGrowthData(Long id) {
        repository.deleteById(id);
    }
}
