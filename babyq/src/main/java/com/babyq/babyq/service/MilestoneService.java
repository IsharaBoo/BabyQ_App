package com.babyq.babyq.service;

import com.babyq.babyq.model.Milestone;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MilestoneService {

    @Autowired
    private MilestoneRepository milestoneRepository;

    public List<Milestone> getAllMilestones() {
        return milestoneRepository.findAll();
    }

    public Optional<Milestone> getMilestoneById(Long id) {
        return milestoneRepository.findById(id);
    }

    public Milestone saveMilestone(Milestone milestone) {
        return milestoneRepository.save(milestone);
    }

    public void deleteMilestone(Long id) {
        milestoneRepository.deleteById(id);
    }
}
