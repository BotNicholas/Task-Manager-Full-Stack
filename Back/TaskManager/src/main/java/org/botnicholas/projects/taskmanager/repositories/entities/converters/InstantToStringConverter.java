package org.botnicholas.projects.taskmanager.repositories.entities.converters;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.time.Instant;

@Converter
public class InstantToStringConverter implements AttributeConverter<Instant, String> {
    @Override
    public String convertToDatabaseColumn(final Instant instant) {
        return instant == null ? null : instant.toString();
    }

    @Override
    public Instant convertToEntityAttribute(final String s) {
        return s == null ? null : Instant.parse(s);
    }
}
