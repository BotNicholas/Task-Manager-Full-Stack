package org.botnicholas.projects.taskmanager.repositories.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.botnicholas.projects.taskmanager.repositories.entities.converters.InstantToStringConverter;

import java.time.Instant;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@SuperBuilder
@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "created_at")
    @Convert(converter = InstantToStringConverter.class)
    @Builder.Default
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    @Convert(converter = InstantToStringConverter.class)
    @Builder.Default
    private Instant updatedAt = Instant.now();
}
