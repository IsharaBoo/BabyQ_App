package com.example.babyQ_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/doctors/**", "/api/parents/**", "/api/children/**").permitAll()  // Allow public access to specific APIs
                        .anyRequest().authenticated()  // Secure all other routes
                )
                .csrf(csrf -> csrf.disable())  // Disable CSRF with lambda
                .sessionManagement(sm -> sm
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // Stateless session management
                );

        return http.build();
    }
}