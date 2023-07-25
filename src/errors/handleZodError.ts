import { ZodError, ZodIssue } from 'zod'
import { GenericErrorMessageType } from '../common/error.interface'

const handleZodError = (err: ZodError) => {
  const errors: GenericErrorMessageType[] = err.issues.map(
    (issue: ZodIssue) => {
      return {
        path: issue.path[issue.path.length - 1],
        message: issue.message,
      }
    },
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'ValidationError',
    errorMessage: errors,
  }
}

export default handleZodError
