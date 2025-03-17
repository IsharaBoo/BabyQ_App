package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Parent;
import com.example.babyQ_backend.repository.ParentRepository;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public void deleteParent(Long id) throws IllegalArgumentException {
        if (!parentRepository.existsById(id)) {
            throw new IllegalArgumentException("Parent with ID " + id + " not found");
        }
        parentRepository.deleteById(id);
    }

    @Override
    public Parent updateParent(Parent parentDetails) throws IllegalArgumentException {
        Long id = parentDetails.getId();
        if (id == null) {
            throw new IllegalArgumentException("Parent ID cannot be null for update");
        }
        return parentRepository.findById(id)
                .map(existingParent -> {
                    existingParent.setFullName(parentDetails.getFullName());
                    existingParent.setNicNumber(parentDetails.getNicNumber());
                    existingParent.setDateOfBirth(parentDetails.getDateOfBirth());
                    existingParent.setAddress(parentDetails.getAddress());
                    existingParent.setPhoneNumber(parentDetails.getPhoneNumber());
                    existingParent.setEmail(parentDetails.getEmail());
                    existingParent.setPassword(parentDetails.getPassword());
                    return parentRepository.save(existingParent);
                })
                .orElseThrow(() -> new IllegalArgumentException("Parent with ID " + id + " not found"));
    }

    @Override
    public Parent getParentById(Long id) {
        Parent parent = parentRepository.findById(id).orElse(null);
        if (parent != null) {
            Hibernate.initialize(parent.getChildren()); // Ensure children are loaded
        }
        return parent;
    }

    @Override
    public Optional<Parent> findByEmail(String email) {
        return parentRepository.findByEmail(email);
    }
}