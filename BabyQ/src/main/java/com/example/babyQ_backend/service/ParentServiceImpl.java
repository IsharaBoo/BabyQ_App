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
}