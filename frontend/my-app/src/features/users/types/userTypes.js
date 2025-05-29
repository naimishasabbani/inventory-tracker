// src/features/users/types/userTypes.js
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  STAFF: 'STAFF',
  VIEWER: 'VIEWER'
}

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: 'Administrator',
  [USER_ROLES.MANAGER]: 'Manager',
  [USER_ROLES.STAFF]: 'Staff',
  [USER_ROLES.VIEWER]: 'Viewer'
}

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED'
}

export const USER_STATUS_LABELS = {
  [USER_STATUS.ACTIVE]: 'Active',
  [USER_STATUS.INACTIVE]: 'Inactive',
  [USER_STATUS.SUSPENDED]: 'Suspended'
}
