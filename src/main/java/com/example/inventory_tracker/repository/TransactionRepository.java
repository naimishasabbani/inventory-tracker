// src/main/java/com/yourcompany/inventory/repository/TransactionRepository.java
package com.example.inventory_tracker.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.inventory_tracker.model.Transaction;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByProductId(String productId);
    List<Transaction> findByUserId(String userId);
    List<Transaction> findByType(Transaction.TransactionType type);
}
