package com.example.babyQ_backend.repository;


import com.example.babyQ_backend.model.Child;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildRepository extends JpaRepository<Child, Long> {
}