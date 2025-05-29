// src/pages/Users.jsx
import React, { useState } from 'react'
import { useUsers } from '../../features/users/hooks/useUsers'
import UserList from '../../features/users/components/UserList'
import UserForm from '../../features/users/components/UserForm'
import Modal from '../../components/common/Modal'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { USER_ROLE_LABELS, USER_STATUS_LABELS } from '../../features/users/types/userTypes'

const Users = () => {
  const {
    users,
    loading,
    error,
    success,
    createUser,
    updateUser,
    deleteUser,
    fetchUsers,
    searchUsers,
    clearMessages
  } = useUsers()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = !filterRole || user.role === filterRole
    const matchesStatus = !filterStatus || (user.status || 'ACTIVE') === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleEdit = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id)
    }
  }

  const handleView = (user) => {
    const userDetails = `
User Details:
Username: ${user.username}
Email: ${user.email}
Role: ${USER_ROLE_LABELS[user.role] || user.role}
Status: ${USER_STATUS_LABELS[user.status] || 'Active'}
Created: ${user.createdAt ? new Date(user.createdAt).toLocaleString() : 'N/A'}
    `.trim()
    alert(userDetails)
  }

  const handleSubmit = async (formData) => {
    let result
    if (selectedUser) {
      result = await updateUser(selectedUser.id, formData)
    } else {
      result = await createUser(formData)
    }
    
    if (result.success) {
      setIsModalOpen(false)
      setSelectedUser(null)
    }
    
    return result
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      await searchUsers(searchTerm)
    } else {
      await fetchUsers()
    }
  }

  const handleRefresh = () => {
    setSearchTerm('')
    setFilterRole('')
    setFilterStatus('')
    fetchUsers()
  }

  // Calculate summary statistics
  const totalUsers = filteredUsers.length
  const adminCount = filteredUsers.filter(u => u.role === 'ADMIN').length
  const activeCount = filteredUsers.filter(u => (u.status || 'ACTIVE') === 'ACTIVE').length

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Users ({totalUsers})</h1>
        <Button onClick={() => setIsModalOpen(true)} disabled={loading}>
          Add User
        </Button>
      </div>

      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px', 
        marginBottom: '20px' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '16px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #007bff'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6c757d' }}>TOTAL USERS</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' }}>{totalUsers}</p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '16px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #ffc107'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6c757d' }}>ADMINISTRATORS</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>{adminCount}</p>
        </div>
        <div style={{ 
          background: 'white', 
          padding: '16px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderLeft: '4px solid #28a745'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6c757d' }}>ACTIVE USERS</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>{activeCount}</p>
        </div>
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
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '16px', alignItems: 'end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <Input
              label="Search Users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by username or email..."
            />
          </div>
          <div style={{ minWidth: '150px' }}>
            <label className="input-label">Filter by Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="input"
            >
              <option value="">All Roles</option>
              {Object.entries(USER_ROLE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ minWidth: '150px' }}>
            <label className="input-label">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="">All Status</option>
              {Object.entries(USER_STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" disabled={loading}>
            Search
          </Button>
          <Button type="button" variant="secondary" onClick={handleRefresh} disabled={loading}>
            🔄 Refresh
          </Button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Loading users...</p>
        </div>
      )}

      {/* User List */}
      {!loading && (
        <UserList 
          users={filteredUsers}
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
          setSelectedUser(null)
        }}
        title={selectedUser ? 'Edit User' : 'Add User'}
        size="medium"
      >
        <UserForm
          user={selectedUser}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsModalOpen(false)
            setSelectedUser(null)
          }}
          loading={loading}
        />
      </Modal>
    </div>
  )
}

export default Users
