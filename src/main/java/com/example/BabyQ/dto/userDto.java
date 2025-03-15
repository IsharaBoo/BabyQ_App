package com.example.BabyQ.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class userDto {
    private Long userId;
    private String fName;
    private LocalDate dob;
    private String address;
    private String phoneNo;
    private String email;
}
