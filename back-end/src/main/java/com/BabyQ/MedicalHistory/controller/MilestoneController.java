package com.BabyQ.MedicalHistory.controller;

import com.BabyQ.MedicalHistory.service.MilestoneService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;

@RestController
@RequestMapping("/api/milestones")
@CrossOrigin(origins = "http://localhost:19006") // Change this to match your frontend URL
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    @PostMapping("/complete")
    public ResponseEntity<?> completeMilestone(@RequestBody Map<String, String> request) {
        String age = request.get("age");
        String category = request.get("category");
        String item = request.get("item");

        boolean success = milestoneService.markMilestoneCompleted(age, category, item);
        return ResponseEntity.ok(Map.of("success", success));
    }
}
