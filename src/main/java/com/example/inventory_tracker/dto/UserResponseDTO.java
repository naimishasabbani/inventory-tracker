// src/main/java/com/example/inventory_tracker/dto/UserResponseDTO.java
package com.example.inventory_tracker.dto;

import java.time.Instant;

public class UserResponseDTO {
    private String id;
    private String username;
    private String role;
    private String email;
    private Instant createdAt;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
