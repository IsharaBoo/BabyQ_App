package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Parent;
import com.example.babyQ_backend.repository.ParentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ParentServiceImpl implements ParentService {
    @Autowired
    private ParentRepository parentRepository;

    @Override
    public Parent registerParent(Parent parent) {
        return parentRepository.save(parent);
    }

    @Override
    public List<Parent> getAllParents() {
        return parentRepository.findAll(); // Retrieve all parents from the database
    }

    @Override
    public void deleteParent(Long id) {
        if (!parentRepository.existsById(id)) {
            throw new IllegalArgumentException("Parent with ID " + id + " not found");
        }
        parentRepository.deleteById(id);
    }

    @Override
    public Parent updateParent(Parent parentDetails) {
        Long id = parentDetails.getId(); // Use the ID from the Parent object
        return parentRepository.findById(id)
                .map(existingParent -> {
                    existingParent.setFullName(parentDetails.getFullName());
                    existingParent.setNicNumber(parentDetails.getNicNumber());
                    existingParent.setDateOfBirth(parentDetails.getDateOfBirth());
                    existingParent.setAddress(parentDetails.getAddress());
                    existingParent.setPhoneNumber(parentDetails.getPhoneNumber());
                    existingParent.setEmail(parentDetails.getEmail());
                    existingParent.setPassword(parentDetails.getPassword());
                    return parentRepository.save(existingParent); // Save updates
                })
                .orElseThrow(() -> new IllegalArgumentException("Parent with ID " + id + " not found"));
    }
}