// src/features/locations/components/LocationForm.jsx
import React, { useState, useEffect } from 'react'
import Input from '../../../components/common/Input'
import Button from '../../../components/common/Button'
import { LOCATION_TYPES, LOCATION_TYPE_LABELS } from '../types/locationTypes'

const LocationForm = ({ location, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: LOCATION_TYPES.WAREHOUSE,
    address: '',
    contactInfo: ''
  })
  
  const [errors, setErrors] = useState({})

  // Populate form when location prop changes
  useEffect(() => {
    if (location) {
      setFormData({
        name: location.name || '',
        type: location.type || LOCATION_TYPES.WAREHOUSE,
        address: location.address || '',
        contactInfo: location.contactInfo || ''
      })
    }
  }, [location])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Location name is required'
    if (!formData.type) newErrors.type = 'Location type is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const result = await onSubmit(formData)
    
    if (result?.success && !location) {
      // Reset form only for new locations
      setFormData({
        name: '',
        type: LOCATION_TYPES.WAREHOUSE,
        address: '',
        contactInfo: ''
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="location-form">
      <Input
        label="Location Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
        disabled={loading}
        placeholder="Enter location name"
      />
      
      <div className="input-group">
        <label className="input-label">
          Location Type <span className="required">*</span>
        </label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`input ${errors.type ? 'input--error' : ''}`}
          disabled={loading}
          required
        >
          {Object.entries(LOCATION_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.type && <span className="input-error">{errors.type}</span>}
      </div>
      
      <div className="input-group">
        <label className="input-label">
          Address <span className="required">*</span>
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={`input textarea ${errors.address ? 'input--error' : ''}`}
          disabled={loading}
          required
          placeholder="Enter full address"
          rows="3"
        />
        {errors.address && <span className="input-error">{errors.address}</span>}
      </div>
      
      <Input
        label="Contact Information"
        name="contactInfo"
        value={formData.contactInfo}
        onChange={handleChange}
        disabled={loading}
        placeholder="Phone, email, or other contact details"
      />
      
      <div className="form-actions">
        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : (location ? 'Update Location' : 'Create Location')}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default LocationForm
