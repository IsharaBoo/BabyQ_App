package com.BabyQ.MedicalHistory.service;

import com.BabyQ.MedicalHistory.model.Milestone;
import com.BabyQ.MedicalHistory.repository.MilestoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class MilestoneService {

    @Autowired
    private MilestoneRepository milestoneRepository;

    public boolean markMilestoneCompleted(String age, String category, String item) {
        Optional<Milestone> existingMilestone = milestoneRepository.findByAgeAndCategoryAndItem(age, category, item);

        if (existingMilestone.isPresent()) {
            return false; // Milestone already completed
        }

        Milestone milestone = new Milestone(age, category, item, LocalDate.now());
        milestoneRepository.save(milestone);
        return true;
    }
}
