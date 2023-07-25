import {
  GenericErrorMessageType,
  GenericErrorResponseType,
} from '../common/error.interface'

type DuplicateKeyError = {
  code: number
  keyValue: Record<string, unknown>
  keyPattern: Record<string, number>
} & Error

const handleDuplicateError = (
  err: DuplicateKeyError,
): GenericErrorResponseType => {
  const errors: GenericErrorMessageType[] = [
    {
      path: '',
      message: err.message,
    },
  ]
  const statusCode = 400
  let duplicateValue = null
  if (err.keyValue) {
    duplicateValue = Object.keys(err.keyPattern)
  }
  return {
    statusCode,
    message: `${duplicateValue} is already in use`,
    errorMessages: errors,
  }
}

export default handleDuplicateError
