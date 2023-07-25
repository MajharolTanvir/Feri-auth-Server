import mongoose from 'mongoose'
import { GenericErrorMessageType } from '../common/error.interface'

const handleCastError = (err: mongoose.Error.CastError) => {
  const errors: GenericErrorMessageType[] = [
    {
      path: err.path,
      message: 'Invalid id',
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Cast Error',
    errorMessage: errors,
  }
}

export default handleCastError
