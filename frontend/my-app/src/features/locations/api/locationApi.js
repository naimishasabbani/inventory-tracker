// src/features/locations/api/locationApi.js
import api from '../../../api/axios'

export const locationApi = {
  // Get all locations
  getAllLocations: () => api.get('/locations'),
  
  // Get location by ID
  getLocationById: (id) => api.get(`/locations/${id}`),
  
  // Create new location
  createLocation: (locationData) => api.post('/locations', locationData),
  
  // Update location
  updateLocation: (id, locationData) => api.put(`/locations/${id}`, locationData),
  
  // Delete location
  deleteLocation: (id) => api.delete(`/locations/${id}`)
}
