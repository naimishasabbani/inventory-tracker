// src/features/users/components/UserForm.jsx
import React, { useState, useEffect } from 'react'
import Input from '../../../components/common/Input'
import Button from '../../../components/common/Button'
import { USER_ROLES, USER_ROLE_LABELS, USER_STATUS, USER_STATUS_LABELS } from '../types/userTypes'

const UserForm = ({ user, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: USER_ROLES.STAFF,
    status: USER_STATUS.ACTIVE,
    passwordHash: ''
  })
  
  const [errors, setErrors] = useState({})

  // Populate form when user prop changes
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        role: user.role || USER_ROLES.STAFF,
        status: user.status || USER_STATUS.ACTIVE,
        passwordHash: '' // Don't populate password for security
      })
    }
  }, [user])

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
    
    if (!formData.username.trim()) newErrors.username = 'Username is required'
    if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters'
    
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) newErrors.email = 'Valid email is required'
    
    if (!formData.role) newErrors.role = 'Role is required'
    
    // Password validation only for new users
    if (!user && !formData.passwordHash.trim()) {
      newErrors.passwordHash = 'Password is required for new users'
    }
    if (formData.passwordHash && formData.passwordHash.length < 6) {
      newErrors.passwordHash = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // Don't send empty password for updates
    const submitData = { ...formData }
    if (user && !submitData.passwordHash) {
      delete submitData.passwordHash
    }
    
    const result = await onSubmit(submitData)
    
    if (result?.success && !user) {
      // Reset form only for new users
      setFormData({
        username: '',
        email: '',
        role: USER_ROLES.STAFF,
        status: USER_STATUS.ACTIVE,
        passwordHash: ''
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <Input
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
        required
        disabled={loading}
        placeholder="Enter username"
      />
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        disabled={loading}
        placeholder="Enter email address"
      />
      
      <div className="input-group">
        <label className="input-label">
          Role <span className="required">*</span>
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className={`input ${errors.role ? 'input--error' : ''}`}
          disabled={loading}
          required
        >
          {Object.entries(USER_ROLE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {errors.role && <span className="input-error">{errors.role}</span>}
      </div>
      
      <div className="input-group">
        <label className="input-label">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="input"
          disabled={loading}
        >
          {Object.entries(USER_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      
      <Input
        label={user ? "New Password (leave blank to keep current)" : "Password"}
        name="passwordHash"
        type="password"
        value={formData.passwordHash}
        onChange={handleChange}
        error={errors.passwordHash}
        required={!user}
        disabled={loading}
        placeholder={user ? "Enter new password (optional)" : "Enter password"}
      />
      
      <div className="form-actions">
        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : (user ? 'Update User' : 'Create User')}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default UserForm
