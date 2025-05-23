// File: src/main/java/com/yourcompany/inventory/repository/ProductRepository.java
package com.example.inventory_tracker.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.inventory_tracker.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
    List<Product> findByNameContaining(String name);
    List<Product> findByCategory(String category);
    List<Product> findByQuantityLessThan(int threshold);
}
