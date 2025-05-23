// src/main/java/com/example/inventory_tracker/dto/LocationRequestDTO.java
package com.example.inventory_tracker.dto;

public class LocationRequestDTO {
    private String name;
    private String address;
    private String type; // warehouse/store
    private String contactInfo;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getContactInfo() { return contactInfo; }
    public void setContactInfo(String contactInfo) { this.contactInfo = contactInfo; }
}
