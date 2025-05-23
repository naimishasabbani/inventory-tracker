// src/main/java/com/example/inventory_tracker/dto/LocationResponseDTO.java
package com.example.inventory_tracker.dto;

public class LocationResponseDTO {
    private String id;
    private String name;
    private String address;
    private String type;
    private String contactInfo;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getContactInfo() { return contactInfo; }
    public void setContactInfo(String contactInfo) { this.contactInfo = contactInfo; }
}
