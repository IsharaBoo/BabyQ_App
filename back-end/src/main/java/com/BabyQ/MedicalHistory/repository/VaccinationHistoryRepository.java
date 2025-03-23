package com.BabyQ.MedicalHistory.repository;

import com.BabyQ.MedicalHistory.model.VaccinationHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaccinationHistoryRepository extends JpaRepository<VaccinationHistory, Long> {
}
