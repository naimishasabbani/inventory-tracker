// File: src/main/java/com/yourcompany/inventory/model/Transaction.java
package com.example.inventory_tracker.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "transactions")
public class Transaction {
    @Id private String id;
    private String productId;
    private TransactionType type;
    private int quantity;
    private Instant timestamp;
    private String userId;
    private String notes;

    public enum TransactionType { IN, OUT }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public TransactionType getType() { return type; }
    public void setType(TransactionType type) { this.type = type; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
