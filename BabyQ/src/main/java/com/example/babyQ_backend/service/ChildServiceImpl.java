package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Child;
import com.example.babyQ_backend.repository.ChildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChildServiceImpl implements ChildService {
    @Autowired
    private ChildRepository childRepository;

    @Override
    public Child registerChild(Child child) {
        return childRepository.save(child);
    }
    @Override
    public Child saveChild(Child child) {
        return childRepository.save(child);
    }
    @Override
    public List<Child> getAllChildren() {
        return childRepository.findAll(); // Retrieve all parents from the database
    }
}