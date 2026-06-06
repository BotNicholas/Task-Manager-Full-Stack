package org.botnicholas.projects.taskmanager.controllers.dto;

import lombok.*;
import org.botnicholas.projects.taskmanager.enums.TaskStatus;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UpdateTaskDto {
    private String title;
    private String description;
    private TaskStatus status;
}
