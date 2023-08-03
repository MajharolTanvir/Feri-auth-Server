/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { CategoryModel, CategoryType } from './category.interface'

const CategorySchema = new Schema<CategoryType, Record<string, never>>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Category = model<CategoryType, CategoryModel>(
  'Category',
  CategorySchema,
)
