/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { UserModel, UserType } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { roles } from './user.constant'

const UserSchema = new Schema<UserType, Record<string, never>>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
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
    token: {
      type: String,
      default: '',
    },
    contactNo: {
      type: String,
    },
    presentAddress: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    shopName: {
      type: String,
    },
    shopContactNo: {
      type: String,
    },
    country: {
      type: String,
    },
    division: {
      type: String,
    },
    district: {
      type: String,
    },
    area: {
      type: String,
    },
    nidNumber: {
      type: String,
    },
    treadLicenseNo: {
      type: String,
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
