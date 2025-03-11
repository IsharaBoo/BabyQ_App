package com.babyq.babyq.controller;

import com.babyq.babyq.model.BabyDevelopment;
import com.babyq.babyq.service.BabyDevelopmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/developments")
public class BabyDevelopmentController {

    @Autowired
    private BabyDevelopmentService babyDevelopmentService;

    @GetMapping
    public List<BabyDevelopment> getAllDevelopments() {
        return babyDevelopmentService.getAllDevelopments();
    }

    @GetMapping("/{id}")
    public Optional<BabyDevelopment> getDevelopmentById(@PathVariable Long id) {
        return babyDevelopmentService.getDevelopmentById(id);
    }

    @PostMapping
    public BabyDevelopment createDevelopment(@RequestBody BabyDevelopment development) {
        return babyDevelopmentService.saveDevelopment(development);
    }

    @DeleteMapping("/{id}")
    public void deleteDevelopment(@PathVariable Long id) {
        babyDevelopmentService.deleteDevelopment(id);
    }
}
