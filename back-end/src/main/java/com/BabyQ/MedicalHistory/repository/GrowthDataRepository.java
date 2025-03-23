package com.BabyQ.MedicalHistory.repository;

import com.BabyQ.MedicalHistory.model.GrowthData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrowthDataRepository extends JpaRepository<GrowthData, Long> {
}
