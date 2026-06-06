package org.botnicholas.projects.taskmanager.config.properties;

import lombok.*;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Configuration
@ConfigurationProperties(prefix = "cors")
public class CorsProperties {
    private String origins;
    private String methods;
    private String headers;
    private boolean allowCredentials;
}
