package org.botnicholas.projects.taskmanager.repositories.entities.projections;

public interface TaskStats {
    Long getTotal();
    Long getTodo();
    Long getInProgress();
    Long getDone();
    Long getRejected();
}
