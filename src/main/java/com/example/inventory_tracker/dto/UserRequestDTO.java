// src/main/java/com/example/inventory_tracker/dto/UserRequestDTO.java
package com.example.inventory_tracker.dto;

public class UserRequestDTO {
    private String username;
    private String password; // Only for registration/login
    private String role;
    private String email;

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
