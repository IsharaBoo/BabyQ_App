package com.example.BabyQ.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Table (name = "comment")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class commentEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long comment_id;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private postEntity post;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private userEntity user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime date;
}
