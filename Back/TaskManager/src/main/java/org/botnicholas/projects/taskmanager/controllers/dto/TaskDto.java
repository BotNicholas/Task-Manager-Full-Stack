package org.botnicholas.projects.taskmanager.controllers.dto;

import lombok.*;
import org.botnicholas.projects.taskmanager.enums.TaskStatus;

import java.time.Instant;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class TaskDto {
    private UUID id;
    private String title;
    private String description;
    private TaskStatus status;
    private Instant createdAt;
    private Instant updatedAt;
}
