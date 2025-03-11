package com.babyq.babyq.repository;

import com.babyq.babyq.model.Milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
}
