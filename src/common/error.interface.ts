export type GenericErrorMessageType = {
  path: string | number
  message: string
}

export type GenericErrorResponseType = {
  statusCode: number
  message: string
  errorMessages: GenericErrorMessageType[]
}
