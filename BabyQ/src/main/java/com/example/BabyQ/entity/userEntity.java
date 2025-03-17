package com.example.BabyQ.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table (name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder

public class userEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String fName;

    @Column(nullable = false)
    private LocalDate dob;

    private String address;
    private String phoneNo;

    @Column(nullable = false, unique = true)
    private String email;
}

