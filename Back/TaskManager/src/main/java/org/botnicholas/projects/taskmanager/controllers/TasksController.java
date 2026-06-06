package org.botnicholas.projects.taskmanager.controllers;

import lombok.RequiredArgsConstructor;
import org.botnicholas.projects.taskmanager.controllers.dto.PageResponse;
import org.botnicholas.projects.taskmanager.controllers.dto.StatisticsDto;
import org.botnicholas.projects.taskmanager.controllers.dto.TaskDto;
import org.botnicholas.projects.taskmanager.controllers.dto.UpdateTaskDto;
import org.botnicholas.projects.taskmanager.enums.TaskStatus;
import org.botnicholas.projects.taskmanager.services.TasksService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TasksController {
    private final TasksService service;

    @GetMapping("/statistics")
    public ResponseEntity<StatisticsDto> getStatistics() {
        return ResponseEntity.ok(service.getStatistics());
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PageResponse<TaskDto>> getAll(@PageableDefault(page = 0, size = 10, sort = {"updatedAt"}, direction = Sort.Direction.DESC)
                                                            final Pageable pageable,
                                                        @RequestParam(name = "status", required = false) final TaskStatus status) {
        Page<TaskDto> page = service.getAll(pageable, status);
        return ResponseEntity.ok(buildPageResponse(page));
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TaskDto> getById(@PathVariable final UUID id) {
        TaskDto task = service.getById(id);
        return ResponseEntity.ok(task);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TaskDto> save(@RequestBody final TaskDto request) {
        TaskDto task = service.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(task);
    }

    @PatchMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TaskDto> updateById(@PathVariable final UUID id,
                                              @RequestBody final UpdateTaskDto request) {
        TaskDto task = service.updateById(id, request);
        return ResponseEntity.ok(task);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TaskDto> replaceById(@PathVariable final UUID id,
                                              @RequestBody final UpdateTaskDto request) {
        TaskDto task = service.replaceById(id, request);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable final UUID id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private <T> PageResponse<T> buildPageResponse(final Page<T> page) {
        return PageResponse.<T>builder()
                .items(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .build();
    }
}
