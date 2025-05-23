// src/main/java/com/example/inventory_tracker/controller/TransactionController.java
package com.example.inventory_tracker.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.inventory_tracker.model.Transaction;
import com.example.inventory_tracker.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public Optional<Transaction> getTransactionById(@PathVariable String id) {
        return transactionService.getTransactionById(id);
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionService.createTransaction(transaction);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable String id) {
        transactionService.deleteTransaction(id);
    }

    @GetMapping("/by-product/{productId}")
    public List<Transaction> getTransactionsByProductId(@PathVariable String productId) {
        return transactionService.getTransactionsByProductId(productId);
    }

    @GetMapping("/by-user/{userId}")
    public List<Transaction> getTransactionsByUserId(@PathVariable String userId) {
        return transactionService.getTransactionsByUserId(userId);
    }

    @GetMapping("/by-type")
    public List<Transaction> getTransactionsByType(@RequestParam Transaction.TransactionType type) {
        return transactionService.getTransactionsByType(type);
    }
}
