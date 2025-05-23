// src/main/java/com/yourcompany/inventory/repository/UserRepository.java
package com.example.inventory_tracker.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.inventory_tracker.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
