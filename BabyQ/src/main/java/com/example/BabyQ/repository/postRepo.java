package com.example.BabyQ.repository;

import com.example.BabyQ.entity.postEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface postRepo extends JpaRepository <postEntity, Long> {

}
