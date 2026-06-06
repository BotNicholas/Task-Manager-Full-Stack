package org.botnicholas.projects.taskmanager.repositories.specifications;

import jakarta.persistence.criteria.Predicate;
import lombok.experimental.UtilityClass;
import org.botnicholas.projects.taskmanager.enums.TaskStatus;
import org.botnicholas.projects.taskmanager.repositories.entities.TaskEntity;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@UtilityClass
public class TaskSpecification {
    private static final String STATUS_FIELD = "status";

    public static Specification<TaskEntity> buildSpec(final TaskStatus status) {
        return ((root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (status != null) {
                predicates.add(cb.equal(root.get(STATUS_FIELD), status));
            }

            return cb.and(predicates);
        });
    }
}
