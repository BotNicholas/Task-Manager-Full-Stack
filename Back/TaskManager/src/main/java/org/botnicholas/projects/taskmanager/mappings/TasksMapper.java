package org.botnicholas.projects.taskmanager.mappings;

import org.botnicholas.projects.taskmanager.controllers.dto.StatisticsDto;
import org.botnicholas.projects.taskmanager.controllers.dto.TaskDto;
import org.botnicholas.projects.taskmanager.controllers.dto.UpdateTaskDto;
import org.botnicholas.projects.taskmanager.repositories.entities.TaskEntity;
import org.botnicholas.projects.taskmanager.repositories.entities.projections.TaskStats;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface TasksMapper {
    TaskDto toDto(final TaskEntity entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    TaskEntity toEntity(final TaskDto dto);

    TaskEntity toEntity(final UpdateTaskDto dto);

    @Mapping(target = "updatedAt", expression = "java(java.time.Instant.now())")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    TaskEntity updateEntity(final UpdateTaskDto dto, @MappingTarget TaskEntity entity);

    @Mapping(target = "updatedAt", expression = "java(java.time.Instant.now())")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.SET_TO_NULL)
    TaskEntity replaceEntity(final UpdateTaskDto dto, @MappingTarget TaskEntity entity);

    @Mapping(source = "total", target = "totalTasks")
    @Mapping(source = "todo", target = "toDo")
    @Mapping(source = "done", target = "completed")
    StatisticsDto toDto(final TaskStats stats);
}
