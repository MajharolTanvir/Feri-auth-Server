/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { RoleType } from './user.constant'

export type UserLogin = {
  email: string
  password: string
}

export type UserType = {
  _id?: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  password: string
  role: RoleType
  confirmedCode: number
  validation: boolean
  token: string
  contactNo?: string
  presentAddress?: string
  profileImage?: string
  shopName?: string
  shopContactNo?: string
  country?: string
  division?: string
  district?: string
  area?: string
  nidNumber?: string
  treadLicenseNo?: string
}

export type UserMethodType = {
  isUserExist(email: string): Promise<Partial<UserType> | null>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
}

export type UserModel = Model<UserType, Record<string, unknown>, UserMethodType>
