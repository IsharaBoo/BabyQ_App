package com.example.BabyQ.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "post")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder


public class postEntity {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long PostId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private userEntity user;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private LocalDateTime date;

}
