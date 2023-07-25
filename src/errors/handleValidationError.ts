import mongoose from 'mongoose'
import {
  GenericErrorMessageType,
  GenericErrorResponseType,
} from '../common/error.interface'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): GenericErrorResponseType => {
  const errors: GenericErrorMessageType[] = Object.values(err?.errors).map(
    (ele: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: ele?.path,
        message: ele?.message,
      }
    },
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation failed',
    errorMessages: errors,
  }
}

export default handleValidationError
