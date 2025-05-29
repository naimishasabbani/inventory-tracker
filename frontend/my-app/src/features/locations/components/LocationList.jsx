// src/features/locations/components/LocationList.jsx
import React from 'react'
import Button from '../../../components/common/Button'
import { LOCATION_TYPE_LABELS } from '../types/locationTypes'
import './LocationList.css'

const LocationList = ({ locations, onEdit, onDelete, onView }) => {
  return (
    <div className="location-list">
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Address</th>
              <th>Contact Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <td>
                  <div className="location-name">
                    <span className="location-icon">
                      {location.type === 'warehouse' ? '🏭' : 
                       location.type === 'store' ? '🏪' : 
                       location.type === 'distribution_center' ? '📦' : '🏢'}
                    </span>
                    {location.name}
                  </div>
                </td>
                <td>
                  <span className={`location-type location-type--${location.type}`}>
                    {LOCATION_TYPE_LABELS[location.type] || location.type}
                  </span>
                </td>
                <td>
                  <div className="location-address">
                    {location.address}
                  </div>
                </td>
                <td>
                  <div className="contact-info">
                    {location.contactInfo || 'N/A'}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <Button size="small" onClick={() => onView(location)}>
                      View
                    </Button>
                    <Button size="small" variant="secondary" onClick={() => onEdit(location)}>
                      Edit
                    </Button>
                    <Button size="small" variant="danger" onClick={() => onDelete(location.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {locations.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📍</div>
          <h3>No locations found</h3>
          <p>Add your first location to get started with inventory management.</p>
        </div>
      )}
    </div>
  )
}

export default LocationList
