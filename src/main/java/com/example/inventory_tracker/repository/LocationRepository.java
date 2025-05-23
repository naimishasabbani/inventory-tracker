// src/main/java/com/yourcompany/inventory/repository/LocationRepository.java
package com.example.inventory_tracker.repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.inventory_tracker.model.Location;

public interface LocationRepository extends MongoRepository<Location, String> {
    // Add custom queries if needed
}
