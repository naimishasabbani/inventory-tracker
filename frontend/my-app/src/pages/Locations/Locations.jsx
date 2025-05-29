// src/pages/Locations.jsx
import React, { useState } from 'react'
import { useLocations } from '../../features/locations/hooks/useLocations'
import LocationList from '../../features/locations/components/LocationList'
import LocationForm from '../../features/locations/components/LocationForm'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { LOCATION_TYPE_LABELS } from '../../features/locations/types/locationTypes'

const Locations = () => {
  const {
    locations,
    loading,
    error,
    success,
    createLocation,
    updateLocation,
    deleteLocation,
    fetchLocations,
    clearMessages
  } = useLocations()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('')

  // Filter locations based on search and type
  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !filterType || location.type === filterType
    return matchesSearch && matchesType
  })

  const handleEdit = (location) => {
    setSelectedLocation(location)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      await deleteLocation(id)
    }
  }

  const handleView = (location) => {
    const locationDetails = `
Location Details:
Name: ${location.name}
Type: ${LOCATION_TYPE_LABELS[location.type] || location.type}
Address: ${location.address}
Contact: ${location.contactInfo || 'N/A'}
    `.trim()
    alert(locationDetails)
  }

  const handleSubmit = async (formData) => {
    let result
    if (selectedLocation) {
      result = await updateLocation(selectedLocation.id, formData)
    } else {
      result = await createLocation(formData)
    }
    
    if (result.success) {
      setIsModalOpen(false)
      setSelectedLocation(null)
    }
    
    return result
  }

  const handleRefresh = () => {
    setSearchTerm('')
    setFilterType('')
    fetchLocations()
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Locations ({filteredLocations.length})</h1>
        <Button onClick={() => setIsModalOpen(true)} disabled={loading}>
          Add Location
        </Button>
      </div>

      {/* Messages */}
      {error && (
        <div style={{ 
          background: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{error}</span>
          <button onClick={clearMessages} style={{ background: 'none', border: 'none', fontSize: '16px' }}>×</button>
        </div>
      )}
      
      {success && (
        <div style={{ 
          background: '#d4edda', 
          color: '#155724', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{success}</span>
          <button onClick={clearMessages} style={{ background: 'none', border: 'none', fontSize: '16px' }}>×</button>
        </div>
      )}

      {/* Search and Filters */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'end' }}>
          <div style={{ flex: 1 }}>
            <Input
              label="Search Locations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or address..."
            />
          </div>
          <div style={{ minWidth: '200px' }}>
            <label className="input-label">Filter by Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input"
            >
              <option value="">All Types</option>
              {Object.entries(LOCATION_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <Button type="button" variant="secondary" onClick={handleRefresh} disabled={loading}>
            🔄 Refresh
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading locations...</p>
        </div>
      )}

      {/* Location List */}
      {!loading && (
        <LocationList 
          locations={filteredLocations}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedLocation(null)
        }}
        title={selectedLocation ? 'Edit Location' : 'Add Location'}
        size="medium"
      >
        <LocationForm
          location={selectedLocation}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedLocation(null)
          }}
          loading={loading}
        />
      </Modal>
    </div>
  )
}

export default Locations
