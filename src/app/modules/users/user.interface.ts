import { Model } from 'mongoose'
import { RoleType } from './user.constant'

export type UserType = {
  name: {
    firstName: 'string'
    lastName: 'string'
  }
  email: 'string'
  password: string
  role: RoleType
  contactNo: 'string'
  address: {
    presentAddress: 'string'
    permanentAddress: 'string'
  }
  profile: 'string'
}

export type UserModel = Model<UserType, Record<string, unknown>>
