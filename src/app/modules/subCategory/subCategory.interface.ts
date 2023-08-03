/* eslint-disable no-unused-vars */
import { Model, Schema } from 'mongoose'

export type SubCategoryType = {
  categoryId: Schema.Types.ObjectId
  name: string
}

export type SubCategoryModel = Model<SubCategoryType, Record<string, unknown>>
