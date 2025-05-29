// src/features/locations/hooks/useLocations.js
import { useState, useEffect } from 'react'
import { locationService } from '../api/locationService'

export const useLocations = () => {
  const [locations, setLocations] = useState([])
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

  // Fetch all locations
  const fetchLocations = async () => {
    setLoading(true)
    setError('')
    
    try {
      const result = await locationService.getAllLocations()
      
      if (result.success) {
        setLocations(result.data)
        setSuccess(result.message)
      } else {
        setError(result.message)
        setLocations([])
      }
    } catch (error) {
      console.error('Fetch locations error:', error)
      setError(error.message || 'Failed to fetch locations')
      setLocations([])
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Create location
  const createLocation = async (locationData) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await locationService.createLocation(locationData)
      
      if (result.success) {
        setLocations(prev => [...prev, result.data])
        setSuccess(result.message)
        return { success: true, data: result.data }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Create location error:', error)
      const errorMessage = error.message || 'Failed to create location'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Update location
  const updateLocation = async (id, locationData) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await locationService.updateLocation(id, locationData)
      
      if (result.success) {
        setLocations(prev => 
          prev.map(location => 
            location.id === id ? result.data : location
          )
        )
        setSuccess(result.message)
        return { success: true, data: result.data }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Update location error:', error)
      const errorMessage = error.message || 'Failed to update location'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Delete location
  const deleteLocation = async (id) => {
    setLoading(true)
    setError('')
    
    try {
      const result = await locationService.deleteLocation(id)
      
      if (result.success) {
        setLocations(prev => prev.filter(location => location.id !== id))
        setSuccess(result.message)
        return { success: true }
      } else {
        setError(result.message)
        return { success: false, message: result.message }
      }
    } catch (error) {
      console.error('Delete location error:', error)
      const errorMessage = error.message || 'Failed to delete location'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
      autoCloseMessages()
    }
  }

  // Load locations on mount
  useEffect(() => {
    fetchLocations()
  }, [])

  return {
    locations,
    loading,
    error,
    success,
    fetchLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    clearMessages
  }
}

export default useLocations
