package com.BabyQ.MedicalHistory.repository;

import com.BabyQ.MedicalHistory.model.AllergyHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllergyHistoryRepository extends JpaRepository<AllergyHistory, Long> {
}
