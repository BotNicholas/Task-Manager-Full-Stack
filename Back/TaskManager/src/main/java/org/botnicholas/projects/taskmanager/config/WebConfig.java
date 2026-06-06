package org.botnicholas.projects.taskmanager.config;

import lombok.RequiredArgsConstructor;
import org.botnicholas.projects.taskmanager.config.properties.CorsProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final CorsProperties props;

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(props.getOrigins())
                .allowedMethods(props.getMethods())
                .allowedHeaders(props.getHeaders())
                .allowCredentials(props.isAllowCredentials());
    }
}
