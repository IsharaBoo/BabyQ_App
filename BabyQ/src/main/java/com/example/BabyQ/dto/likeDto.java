package com.example.BabyQ.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class likeDto {
    private Long likeId;
    private Long postId;
    private Long userId;
}
