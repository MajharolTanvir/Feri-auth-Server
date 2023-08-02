/* eslint-disable no-unused-vars */
import { Model, Schema } from 'mongoose'

export type ProductsType = {
  name: string
  image: string[]
  description: string
  brand: string
  tags: string[]
  review: number //{default: 5 }
  seller: Schema.Types.ObjectId
  categories: string[] //["Fashion", "Electric"]
  quantity: number
  color?: string[] //["red", "green", "black", "blue", "purple", "yellow"],
  size?: string[] //[38, 40, 42, 44]
  weight?: string[]
  inStoke: number
  price: number
  delivery: {
    freeShipping?: {
      location: string
      Charge: string
      shippingDate: string
    }
    paidShipping: {
      shippingCharge: number
      shippingDate: string
    }
  }
  display: 'Show' | 'Hidden'
}

export type ProductsModel = Model<ProductsType, Record<string, unknown>>
