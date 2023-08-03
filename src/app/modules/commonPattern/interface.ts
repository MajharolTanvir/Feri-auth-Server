/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

//* Color Interface
export type ColorType = {
  name: string
  hexCode: string
}

export type ColorModel = Model<ColorType, Record<string, unknown>>

//* Size Interface
export type SizeType = {
  name: number
}

export type SizeModel = Model<SizeType, Record<string, unknown>>

//* Weight Interface
export type WeightType = {
  name: string
}

export type WeightModel = Model<WeightType, Record<string, unknown>>
