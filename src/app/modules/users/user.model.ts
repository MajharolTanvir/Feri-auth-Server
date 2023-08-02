/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { UserModel, UserType } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { roles } from './user.constant'

const UserSchema = new Schema<UserType, Record<string, never>>(
  {
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
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: roles,
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
    },
    profile: {
      type: String,
      required: true,
      default: 'https://cdn.kibrispdr.org/data/637/icon-profile-png-0.png',
    },
    token: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

UserSchema.methods.isUserExist = async function (
  email: string,
): Promise<Partial<UserType> | null> {
  return await User.findOne(
    { email },
    { _id: 1, password: 1, email: 1, role: 1 },
  )
}

UserSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

UserSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

export const User = model<UserType, UserModel>('User', UserSchema)
