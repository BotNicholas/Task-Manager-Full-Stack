package org.botnicholas.projects.taskmanager.repositories.entities.projections;

import jakarta.persistence.Column;

public interface TaskStats {
    Long getTotal();
    Long getTodo();
    Long getInProgress();
    Long getDone();
    Long getRejected();
}
