package org.botnicholas.projects.taskmanager.controllers;

import org.botnicholas.projects.taskmanager.controllers.dto.ErrorResponse;
import org.botnicholas.projects.taskmanager.exceptions.BaseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;

@RestControllerAdvice
public class RestExceptionHandler {
    @ExceptionHandler(value = BaseException.class, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ErrorResponse> handleBaseException(final BaseException ex) {
        HttpStatus status = ex.getClass().getAnnotation(ResponseStatus.class).value();
        ErrorResponse body = ErrorResponse.builder()
                .code(status.value())
                .timestamp(Instant.now())
                .message(ex.getMessage())
                .build();
        return ResponseEntity.status(status).body(body);
    }

    @ExceptionHandler(value = Exception.class, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ErrorResponse> handleException(final Exception ex) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        ErrorResponse body = ErrorResponse.builder()
                .code(status.value())
                .timestamp(Instant.now())
                .message(ex.getMessage())
                .build();
        return ResponseEntity.status(status).body(body);
    }
}
