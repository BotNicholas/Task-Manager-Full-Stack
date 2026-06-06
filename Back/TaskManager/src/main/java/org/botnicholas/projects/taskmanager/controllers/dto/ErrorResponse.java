package org.botnicholas.projects.taskmanager.controllers.dto;

import lombok.*;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ErrorResponse {
    private int code;
    private String message;
    private Instant timestamp;
}
