// src/features/transactions/api/transactionApi.js
import api from '../../../api/axios'

export const transactionApi = {
  // Get all transactions
  getAllTransactions: () => api.get('/transactions'),
  
  // Get transaction by ID
  getTransactionById: (id) => api.get(`/transactions/${id}`),
  
  // Create new transaction
  createTransaction: (transactionData) => api.post('/transactions', transactionData),
  
  // Delete transaction
  deleteTransaction: (id) => api.delete(`/transactions/${id}`),
  
  // Get transactions by product ID
  getTransactionsByProduct: (productId) => api.get(`/transactions/by-product/${productId}`),
  
  // Get transactions by user ID
  getTransactionsByUser: (userId) => api.get(`/transactions/by-user/${userId}`),
  
  // Get transactions by type
  getTransactionsByType: (type) => api.get(`/transactions/by-type?type=${type}`)
}
