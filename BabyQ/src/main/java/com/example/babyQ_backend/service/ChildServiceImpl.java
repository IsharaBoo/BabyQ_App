package com.example.babyQ_backend.service;

import com.example.babyQ_backend.model.Child;
import com.example.babyQ_backend.model.Parent;
import com.example.babyQ_backend.repository.ChildRepository;
import org.hibernate.Hibernate;
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

    // UPDATE CHILD
    @Override
    public Child updateChild(Long id, Child childDetails) {
        return childRepository.findById(id).map(existingChild -> {
            existingChild.setName(childDetails.getName());
            existingChild.setBirthCNo(childDetails.getBirthCNo());
            existingChild.setDob(childDetails.getDob());
            existingChild.setGender(childDetails.getGender());
            existingChild.setBloodGroup(childDetails.getBloodGroup());
            existingChild.setAllergies(childDetails.getAllergies());
            existingChild.setAge(childDetails.getAge());
            existingChild.setWeight(childDetails.getWeight());
            existingChild.setHeight(childDetails.getHeight());
            existingChild.setAdditionalDetails(childDetails.getAdditionalDetails());
            if (childDetails.getParent() != null) {
                existingChild.setParent(childDetails.getParent());
            }
            return childRepository.save(existingChild);
        }).orElseThrow(() -> new IllegalArgumentException("Child with ID " + id + " not found"));
    }

    // DELETE CHILD
    @Override
    public void deleteChild(Long id) throws IllegalArgumentException {
        if (!childRepository.existsById(id)) {
            throw new IllegalArgumentException("Child with ID " + id + " not found");
        }
        childRepository.deleteById(id);
    }
    @Override
    public Child getChildById(Long id) {
        Child parent = childRepository.findById(id).orElse(null);
        return parent;
    }
}