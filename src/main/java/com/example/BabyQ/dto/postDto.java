package com.example.BabyQ.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class postDto {
    private Long postId;
    private Long userId;
    private String content;
    private LocalDateTime date;
}
