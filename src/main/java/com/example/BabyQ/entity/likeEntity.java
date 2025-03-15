package com.example.BabyQ.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table (name = "like")
@Getter
@Setter
@Builder

public class likeEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private postEntity post;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private userEntity user;
}




