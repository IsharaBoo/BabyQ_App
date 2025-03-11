package com.babyq.babyq.service;

import com.babyq.babyq.model.BabyDevelopment;
import com.babyq.babyq.repository.BabyDevelopmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BabyDevelopmentService {

    @Autowired
    private BabyDevelopmentRepository babyDevelopmentRepository;

    public List<BabyDevelopment> getAllDevelopments() {
        return babyDevelopmentRepository.findAll();
    }

    public Optional<BabyDevelopment> getDevelopmentById(Long id) {
        return babyDevelopmentRepository.findById(id);
    }

    public BabyDevelopment saveDevelopment(BabyDevelopment development) {
        return babyDevelopmentRepository.save(development);
    }

    public void deleteDevelopment(Long id) {
        babyDevelopmentRepository.deleteById(id);
    }
}
