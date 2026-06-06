package org.botnicholas.projects.taskmanager.repositories;

import org.botnicholas.projects.taskmanager.repositories.entities.TaskEntity;
import org.botnicholas.projects.taskmanager.repositories.entities.projections.TaskStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TasksRepository extends JpaRepository<TaskEntity, UUID>, JpaSpecificationExecutor<TaskEntity> {
    @Query("""
        SELECT count(t) as total,
               count(t) FILTER (WHERE t.status = 'TO_DO') as todo,
               count(t) FILTER (WHERE t.status = 'IN_PROGRESS') as inProgress,
               count(t) FILTER (WHERE t.status = 'DONE') as done,
               count(t) FILTER (WHERE t.status = 'REJECTED') as rejected
        FROM TaskEntity t
    """)
    TaskStats getTaskStats();
}
