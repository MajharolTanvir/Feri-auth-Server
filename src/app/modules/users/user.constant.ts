export type RoleType = {
  role: 'admin' | 'moderator' | 'buyer' | 'seller'
}

export const roles = ['admin', 'moderator', 'buyer', 'seller']

export const EVENT_USER_CREATED = 'user-created'
export const EVENT_USER_UPDATED = 'user-updated'
