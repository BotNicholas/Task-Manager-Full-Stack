package org.botnicholas.projects.taskmanager.services;

import lombok.RequiredArgsConstructor;
import org.botnicholas.projects.taskmanager.controllers.dto.StatisticsDto;
import org.botnicholas.projects.taskmanager.controllers.dto.TaskDto;
import org.botnicholas.projects.taskmanager.controllers.dto.UpdateTaskDto;
import org.botnicholas.projects.taskmanager.enums.TaskStatus;
import org.botnicholas.projects.taskmanager.exceptions.NotFoundException;
import org.botnicholas.projects.taskmanager.mappings.TasksMapper;
import org.botnicholas.projects.taskmanager.repositories.TasksRepository;
import org.botnicholas.projects.taskmanager.repositories.entities.TaskEntity;
import org.botnicholas.projects.taskmanager.repositories.specifications.TaskSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static org.botnicholas.projects.taskmanager.constants.ErrorConstants.Templates.NOT_FOUND_BY_ID_TEMPLATE;

@Service
@RequiredArgsConstructor
public class TasksService {
    private final TasksRepository tasksRepository;
    private final TasksMapper mapper;

    public Page<TaskDto> getAll(final Pageable pageable, final TaskStatus status) {
        Specification<TaskEntity> taskSpecification = TaskSpecification.buildSpec(status);
        return tasksRepository.findAll(taskSpecification, pageable).map(mapper::toDto);
    }

    public TaskDto getById(final UUID id) {
        return mapper.toDto(getByIdOrThrow(id));
    }

    public StatisticsDto getStatistics() {
        return mapper.toDto(tasksRepository.getTaskStats());
    }

    public TaskDto save(final TaskDto request) {
        return mapper.toDto(tasksRepository.save(mapper.toEntity(request)));
    }

    public TaskDto updateById(final UUID id, final UpdateTaskDto request) {
        TaskEntity entity = getByIdOrThrow(id);
        mapper.updateEntity(request, entity);
        return mapper.toDto(tasksRepository.save(entity));
    }

    public TaskDto replaceById(final UUID id, final UpdateTaskDto request) {
        TaskEntity entity = getByIdOrThrow(id);
        mapper.replaceEntity(request, entity);
        if (entity.getTitle() == null) {
            entity.setTitle("");
        }
        return mapper.toDto(tasksRepository.save(entity));
    }

    public void deleteById(final UUID id) {
        TaskEntity entity = getByIdOrThrow(id);
        tasksRepository.deleteById(entity.getId());
    }

    private TaskEntity getByIdOrThrow(final UUID id) {
        return tasksRepository.findById(id).orElseThrow(() -> new NotFoundException(NOT_FOUND_BY_ID_TEMPLATE.formatted("task", id)));
    }
}
