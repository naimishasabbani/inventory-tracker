// src/features/users/components/UserList.jsx
import React from 'react'
import Button from '../../../components/common/Button'
import { USER_ROLE_LABELS, USER_STATUS_LABELS } from '../types/userTypes'
import './UserList.css'

const UserList = ({ users, onEdit, onDelete, onView }) => {
  // Helper function to format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString()
  }

  // Helper function to get role icon
  const getRoleIcon = (role) => {
    switch (role) {
      case 'ADMIN': return '👑'
      case 'MANAGER': return '👨‍💼'
      case 'STAFF': return '👷'
      case 'VIEWER': return '👁️'
      default: return '👤'
    }
  }

  return (
    <div className="user-list">
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-info">
                    <span className="user-icon">
                      {getRoleIcon(user.role)}
                    </span>
                    <div className="user-details">
                      <div className="username">{user.username}</div>
                      <div className="user-id">ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="user-email">
                    {user.email}
                  </div>
                </td>
                <td>
                  <span className={`user-role user-role--${user.role.toLowerCase()}`}>
                    {USER_ROLE_LABELS[user.role] || user.role}
                  </span>
                </td>
                <td>
                  <div className="created-date">
                    {user.createdAt ? formatDate(user.createdAt) : 'N/A'}
                  </div>
                </td>
                <td>
                  <span className={`user-status user-status--${(user.status || 'ACTIVE').toLowerCase()}`}>
                    {USER_STATUS_LABELS[user.status] || 'Active'}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <Button size="small" onClick={() => onView(user)}>
                      View
                    </Button>
                    <Button size="small" variant="secondary" onClick={() => onEdit(user)}>
                      Edit
                    </Button>
                    <Button size="small" variant="danger" onClick={() => onDelete(user.id)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {users.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No users found</h3>
          <p>Add your first user to get started with user management.</p>
        </div>
      )}
    </div>
  )
}

export default UserList
