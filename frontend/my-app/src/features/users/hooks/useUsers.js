// src/features/users/hooks/useUsers.js
import { useState, useEffect } from 'react'
import { userService } from '../api/userService'

export const useUsers = () => {
  const [users, setUsers] = useState([])
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

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    
    try {
      const result = await userService.getAllUsers()
      
      if (result.success) {
        setUsers(result.data)
        setSuccess(result.message)
      } else {
        setError(result.message)
        setUsers([])
      }
    } catch (error) {
      console.error('Fetch users error:', error)
      setError(error.message || 'Failed to fetch users')
      setUsers([])
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Create user
  const createUser = async (userData) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await userService.createUser(userData)
      
      if (result.success) {
        setUsers(prev => [...prev, result.data])
        setSuccess(result.message)
        return { success: true, data: result.data }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Create user error:', error)
      const errorMessage = error.message || 'Failed to create user'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Update user
  const updateUser = async (id, userData) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await userService.updateUser(id, userData)
      
      if (result.success) {
        setUsers(prev => 
          prev.map(user => 
            user.id === id ? result.data : user
          )
        )
        setSuccess(result.message)
        return { success: true, data: result.data }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Update user error:', error)
      const errorMessage = error.message || 'Failed to update user'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Delete user
  const deleteUser = async (id) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await userService.deleteUser(id)
      
      if (result.success) {
        setUsers(prev => prev.filter(user => user.id !== id))
        setSuccess(result.message)
        return { success: true }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Delete user error:', error)
      const errorMessage = error.message || 'Failed to delete user'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Search users by username
  const searchUsers = async (searchTerm) => {
    setLoading(true)
    setError('')
    
    try {
      const result = searchTerm?.trim() 
        ? await userService.getUserByUsername(searchTerm)
        : await userService.getAllUsers()
      
      if (result.success) {
        setUsers(searchTerm?.trim() ? [result.data] : result.data)
        setSuccess(`Found ${searchTerm?.trim() ? 1 : result.data.length} users`)
      } else {
        setError(result.message)
        setUsers([])
      }
    } catch (error) {
      console.error('Search users error:', error)
      setError(error.message || 'Search failed')
      setUsers([])
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Load users on mount
  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users,
    loading,
    error,
    success,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    searchUsers,
    clearMessages
  }
}

export default useUsers
