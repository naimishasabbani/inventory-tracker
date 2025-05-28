// src/features/users/api/userApi.js
import api from '../../../api/axios'

export const userApi = {
  // Get all users
  getAllUsers: () => api.get('/users'),
  
  // Get user by ID
  getUserById: (id) => api.get(`/users/${id}`),
  
  // Get user by username
  getUserByUsername: (username) => api.get(`/users/by-username?username=${username}`),
  
  // Create new user
  createUser: (userData) => api.post('/users', userData),
  
  // Update user
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  
  // Delete user
  deleteUser: (id) => api.delete(`/users/${id}`)
}
