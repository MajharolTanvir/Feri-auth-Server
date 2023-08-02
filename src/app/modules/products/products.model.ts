import { Schema, model } from 'mongoose'
import { ProductsModel, ProductsType } from './products.interface'
import { display } from './products.constent'

const ProductsSchema = new Schema<ProductsType, Record<string, never>>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    review: {
      type: Number,
      default: 5,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: {
      type: [String],
    },
    size: {
      type: [String],
    },
    weight: {
      type: [String],
    },
    inStoke: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    delivery: {
      freeShipping: {
        type: {
          location: {
            type: String,
            required: true,
          },
          Charge: {
            type: 'Free',
            required: true,
          },
          shippingDate: {
            type: String,
            required: true,
          },
        },
      },
      paidShipping: {
        type: {
          shippingCharge: {
            type: Number,
            required: true,
          },
          shippingDate: {
            type: String,
            required: true,
          },
        },
        required: true,
      },
    },
    display: {
      type: String,
      required: true,
      enum: display,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

export const Products = model<ProductsType, ProductsModel>(
  'Products',
  ProductsSchema,
)
