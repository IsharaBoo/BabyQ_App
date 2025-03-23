package com.BabyQ.MedicalHistory.controller;

import com.BabyQ.MedicalHistory.model.GrowthData;
import com.BabyQ.MedicalHistory.service.GrowthDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:19006") // Allow requests from React Native frontend
@RestController
@RequestMapping("/api/growth-data")
public class GrowthDataController {

    @Autowired
    private GrowthDataService service;

    // Get all growth data records
    @GetMapping
    public List<GrowthData> getAllGrowthData() {
        return service.getAllGrowthData();
    }

    // Get a single growth data record by ID
    @GetMapping("/{id}")
    public GrowthData getGrowthDataById(@PathVariable Long id) {
        return service.getGrowthDataById(id);
    }

    // Add a new growth data record
    @PostMapping
    public GrowthData addGrowthData(@RequestBody GrowthData data) {
        return service.addGrowthData(data);
    }

    // Update an existing growth data record
    @PutMapping
    public GrowthData updateGrowthData(@RequestBody GrowthData data) {
        return service.updateGrowthData(data);
    }

    // Delete a growth data record by ID
    @DeleteMapping("/{id}")
    public String deleteGrowthData(@PathVariable Long id) {
        service.deleteGrowthData(id);
        return "Growth data deleted with id: " + id;
    }
}
