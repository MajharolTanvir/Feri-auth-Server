/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { ColorModel, ColorType, SizeType, WeightType } from './interface'

//* Color model
const ColorSchema = new Schema<ColorType, Record<string, never>>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    hexCode: {
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

export const Color = model<ColorType, ColorModel>('Color', ColorSchema)

//* Size model
const SizeSchema = new Schema<SizeType, Record<string, never>>(
  {
    name: {
      type: Number,
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

export const Size = model<SizeType, ColorModel>('Size', SizeSchema)

//* Weight model
const WeightSchema = new Schema<WeightType, Record<string, never>>(
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

export const Weight = model<WeightType, ColorModel>('Weight', WeightSchema)
