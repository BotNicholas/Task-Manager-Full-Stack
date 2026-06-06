package org.botnicholas.projects.taskmanager.repositories.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.botnicholas.projects.taskmanager.enums.TaskStatus;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@Entity
@Table(name = "tasks")
public class TaskEntity extends BaseEntity {
    private String title;
    private String description;
    @Column(columnDefinition = "enum")
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
}
