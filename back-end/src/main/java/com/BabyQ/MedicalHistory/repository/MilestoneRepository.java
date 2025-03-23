package com.BabyQ.MedicalHistory.repository;

import com.BabyQ.MedicalHistory.model.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    Optional<Milestone> findByAgeAndCategoryAndItem(String age, String category, String item);
}
