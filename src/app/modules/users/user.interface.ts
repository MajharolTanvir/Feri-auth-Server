/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { RoleType } from './user.constant'

export type UserLogin = {
  email: string
  password: string
}

export type UserType = {
  _id?: string
  name: {
    firstName: string
    middleName: string
    lastName: string
  }
  email: string
  password: string
  role: RoleType
  token: string
}

export type UserMethodType = {
  isUserExist(email: string): Promise<Partial<UserType> | null>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
}

export type UserModel = Model<UserType, Record<string, unknown>, UserMethodType>
