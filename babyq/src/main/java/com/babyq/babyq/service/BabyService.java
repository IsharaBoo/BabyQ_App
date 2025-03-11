package com.babyq.babyq.service;

import com.babyq.babyq.model.Baby;
import com.babyq.babyq.repository.BabyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BabyService {

    @Autowired
    private BabyRepository babyRepository;

    public List<Baby> getAllBabies() {
        return babyRepository.findAll();
    }

    public Optional<Baby> getBabyById(Long id) {
        return babyRepository.findById(id);
    }

    public Baby saveBaby(Baby baby) {
        return babyRepository.save(baby);
    }

    public void deleteBaby(Long id) {
        babyRepository.deleteById(id);
    }
}
