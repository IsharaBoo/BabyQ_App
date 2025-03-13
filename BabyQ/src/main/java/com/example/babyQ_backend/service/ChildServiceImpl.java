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
        return childRepository.findAll();
    }

    // ✅ UPDATE CHILD
    @Override
    public Child updateChild(Long id, Child childDetails) throws IllegalArgumentException {
        return childRepository.findById(id).map(existingChild -> {
            existingChild.setName(childDetails.getName());
            existingChild.setDob(childDetails.getDob());
            existingChild.setGender(childDetails.getGender());
            existingChild.setParent(childDetails.getParent()); // Ensure Parent is updated correctly if needed

            return childRepository.save(existingChild);
        }).orElseThrow(() -> new IllegalArgumentException("Child with ID " + id + " not found"));
    }

    // ✅ DELETE CHILD
    @Override
    public void deleteChild(Long id) throws IllegalArgumentException {
        if (!childRepository.existsById(id)) {
            throw new IllegalArgumentException("Child with ID " + id + " not found");
        }
        childRepository.deleteById(id);
    }
}
