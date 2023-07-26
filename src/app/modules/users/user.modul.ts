import { Schema, model } from 'mongoose'
import { UserModel, UserType } from './user.interface'
import { Roles } from './user.constant'

const UserSchema = new Schema<UserType, Record<string, never>>({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: Roles,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
  },
})

export const User = model<UserType, UserModel>('user', UserSchema)
