// src/main/java/com/example/inventory_tracker/dto/TransactionRequestDTO.java
package com.example.inventory_tracker.dto;

public class TransactionRequestDTO {
    private String productId;
    private String type; // "IN" or "OUT"
    private int quantity;
    private String userId;
    private String notes;

    // Getters and Setters
    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
