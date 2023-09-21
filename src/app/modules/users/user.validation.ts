import { z } from 'zod'
import { roles } from './user.constant'

const signupZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'First name is required',
    }),
    lastName: z.string({
      required_error: 'Last name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum([...roles] as [string, ...string[]], {
      required_error: 'Role is required',
    }),
    token: z.string().optional(),
  }),
})

export const UserValidation = {
  signupZodSchema,
}
