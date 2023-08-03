import { z } from 'zod'

const createCategoryZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Category name is required',
    }),
    image: z.string({
      required_error: 'Image is required',
    }),
  }),
})

const updateCategoryZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
  }),
})

export const CategoryValidation = {
  createCategoryZodSchema,
  updateCategoryZodSchema,
}
