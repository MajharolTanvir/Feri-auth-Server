/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type CategoryType = {
  name: string
  image: string
}

export type CategoryModel = Model<CategoryType, Record<string, unknown>>
