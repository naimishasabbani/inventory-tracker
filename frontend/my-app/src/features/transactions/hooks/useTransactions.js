// src/features/transactions/hooks/useTransactions.js
import { useState, useEffect } from 'react'
import { transactionService } from '../api/transactionService'

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Clear messages
  const clearMessages = () => {
    setError('')
    setSuccess('')
  }

  // Auto clear messages after 5 seconds
  const autoCloseMessages = () => {
    setTimeout(() => {
      setError('')
      setSuccess('')
    }, 5000)
  }

  // Fetch all transactions
  const fetchTransactions = async () => {
    setLoading(true)
    setError('')
    
    try {
      const result = await transactionService.getAllTransactions()
      
      if (result.success) {
        setTransactions(result.data)
        setSuccess(result.message)
      } else {
        setError(result.message)
        setTransactions([])
      }
    } catch (error) {
      console.error('Fetch transactions error:', error)
      setError(error.message || 'Failed to fetch transactions')
      setTransactions([])
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Create transaction
  const createTransaction = async (transactionData) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await transactionService.createTransaction(transactionData)
      
      if (result.success) {
        setTransactions(prev => [result.data, ...prev])
        setSuccess(result.message)
        return { success: true, data: result.data }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Create transaction error:', error)
      const errorMessage = error.message || 'Failed to create transaction'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Delete transaction
  const deleteTransaction = async (id) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await transactionService.deleteTransaction(id)
      
      if (result.success) {
        setTransactions(prev => prev.filter(transaction => transaction.id !== id))
        setSuccess(result.message)
        return { success: true }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Delete transaction error:', error)
      const errorMessage = error.message || 'Failed to delete transaction'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Get transactions by product
  const getTransactionsByProduct = async (productId) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await transactionService.getTransactionsByProduct(productId)
      
      if (result.success) {
        setTransactions(result.data)
        setSuccess(result.message)
      } else {
        setError(result.message)
        setTransactions([])
      }
    } catch (error) {
      console.error('Get transactions by product error:', error)
      setError(error.message || 'Failed to fetch product transactions')
      setTransactions([])
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Get transactions by type
  const getTransactionsByType = async (type) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await transactionService.getTransactionsByType(type)
      
      if (result.success) {
        setTransactions(result.data)
        setSuccess(result.message)
      } else {
        setError(result.message)
        setTransactions([])
      }
    } catch (error) {
      console.error('Get transactions by type error:', error)
      setError(error.message || 'Failed to fetch transactions by type')
      setTransactions([])
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Load transactions on mount
  useEffect(() => {
    fetchTransactions()
  }, [])

  return {
    transactions,
    loading,
    error,
    success,
    fetchTransactions,
    createTransaction,
    deleteTransaction,
    getTransactionsByProduct,
    getTransactionsByType,
    clearMessages
  }
}

export default useTransactions
