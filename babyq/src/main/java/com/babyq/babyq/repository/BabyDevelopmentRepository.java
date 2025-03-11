package com.babyq.babyq.repository;

import com.babyq.babyq.model.BabyDevelopment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BabyDevelopmentRepository extends JpaRepository<BabyDevelopment, Long> {
}
