import { z } from 'zod'
import { roles } from './user.constant'

const signupZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
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
    contactNo: z.string({
      required_error: 'Contact no is required',
    }),
    address: z.object({
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
    }),
    profile: z.string().optional(),
  }),
})

export const UserValidation = {
  signupZodSchema,
}
