/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, Types, model } from 'mongoose'
import { SubCategoryModel, SubCategoryType } from './subCategory.interface'

const SubCategorySchema = new Schema<SubCategoryType, Record<string, never>>(
  {
    categoryId: {
      type: Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const SubCategory = model<SubCategoryType, SubCategoryModel>(
  'SubCategory',
  SubCategorySchema,
)
