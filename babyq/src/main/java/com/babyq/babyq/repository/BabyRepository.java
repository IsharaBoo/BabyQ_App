package com.babyq.babyq.repository;

import com.babyq.babyq.model.Baby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BabyRepository extends JpaRepository<Baby, Long> {
}
