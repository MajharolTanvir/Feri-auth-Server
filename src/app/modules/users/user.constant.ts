export type RoleType = {
  role: 'BUYER' | 'SELLER' | 'MODERATOR' | 'ADMIN'
}

export const roles = ['ADMIN', 'MODERATOR', 'SELLER', 'BUYER']

export const EVENT_USER_CREATED = 'user-created'
export const EVENT_USER_UPDATED = 'user-updated'
