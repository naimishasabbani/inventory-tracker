// src/main/java/com/example/inventory_tracker/dto/TransactionResponseDTO.java
package com.example.inventory_tracker.dto;

import java.time.Instant;

public class TransactionResponseDTO {
    private String id;
    private String productId;
    private String type;
    private int quantity;
    private Instant timestamp;
    private String userId;
    private String notes;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
