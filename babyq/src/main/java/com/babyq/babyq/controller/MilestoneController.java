package com.babyq.babyq.controller;

import com.babyq.babyq.model.Milestone;
import com.babyq.babyq.service.MilestoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/milestones")
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    @GetMapping
    public List<Milestone> getAllMilestones() {
        return milestoneService.getAllMilestones();
    }

    @GetMapping("/{id}")
    public Optional<Milestone> getMilestoneById(@PathVariable Long id) {
        return milestoneService.getMilestoneById(id);
    }

    @PostMapping
    public Milestone createMilestone(@RequestBody Milestone milestone) {
        return milestoneService.saveMilestone(milestone);
    }

    @DeleteMapping("/{id}")
    public void deleteMilestone(@PathVariable Long id) {
        milestoneService.deleteMilestone(id);
    }
}
