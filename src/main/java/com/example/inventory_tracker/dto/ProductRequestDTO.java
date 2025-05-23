// src/main/java/com/example/inventory_tracker/dto/ProductRequestDTO.java
package com.example.inventory_tracker.dto;

public class ProductRequestDTO {
    private String name;
    private String sku;
    private String description;
    private double price;
    private int quantity;
    private String locationId;
    private String category;
    private int threshold;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public String getLocationId() { return locationId; }
    public void setLocationId(String locationId) { this.locationId = locationId; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getThreshold() { return threshold; }
    public void setThreshold(int threshold) { this.threshold = threshold; }
}
