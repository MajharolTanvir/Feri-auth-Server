import { z } from 'zod'

const createSubCategoryZodSchema = z.object({
  body: z.object({
    categoryId: z.string({
      required_error: 'Category id is required',
    }),
    name: z.string({
      required_error: 'Sub category name is required',
    }),
  }),
})

const updateSubCategoryZodSchema = z.object({
  body: z.object({
    categoryId: z.string().optional(),
    name: z.string({
      required_error: 'Sub category name is required',
    }),
  }),
})

export const SubCategoryValidation = {
  createSubCategoryZodSchema,
  updateSubCategoryZodSchema,
}
