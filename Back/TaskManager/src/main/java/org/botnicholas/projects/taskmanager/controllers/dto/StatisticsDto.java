package org.botnicholas.projects.taskmanager.controllers.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class StatisticsDto {
    private int totalTasks;
    private int toDo;
    private int inProgress;
    private int completed;
    private int rejected;
}
