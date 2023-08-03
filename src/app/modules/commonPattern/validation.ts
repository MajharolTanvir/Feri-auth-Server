import { z } from 'zod'

const createColorZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Color name is required',
    }),
    hexCode: z.string({
      required_error: 'Color code is required',
    }),
  }),
})

const updateColorZodSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Color name is required',
      })
      .optional(),
    hexCode: z
      .string({
        required_error: 'Color code is required',
      })
      .optional(),
  }),
})

const createSizeZodSchema = z.object({
  body: z.object({
    name: z.number({
      required_error: 'Size name is required',
    }),
  }),
})

const updateSizeZodSchema = z.object({
  body: z.object({
    name: z.number({
      required_error: 'Size name is required',
    }),
  }),
})

const createWeightZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Weight name is required',
    }),
  }),
})

const updateWeightZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Weight name is required',
    }),
  }),
})

export const CommonValidation = {
  createColorZodSchema,
  updateColorZodSchema,
  createSizeZodSchema,
  updateSizeZodSchema,
  createWeightZodSchema,
  updateWeightZodSchema,
}
