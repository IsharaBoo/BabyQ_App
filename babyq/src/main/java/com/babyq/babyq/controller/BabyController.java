package com.babyq.babyq.controller;

import com.babyq.babyq.model.Baby;
import com.babyq.babyq.service.BabyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/babies")
public class BabyController {

    @Autowired
    private BabyService babyService;

    @GetMapping
    public List<Baby> getAllBabies() {
        return babyService.getAllBabies();
    }

    @GetMapping("/{id}")
    public Optional<Baby> getBabyById(@PathVariable Long id) {
        return babyService.getBabyById(id);
    }

    @PostMapping
    public Baby createBaby(@RequestBody Baby baby) {
        return babyService.saveBaby(baby);
    }

    @DeleteMapping("/{id}")
    public void deleteBaby(@PathVariable Long id) {
        babyService.deleteBaby(id);
    }
}
