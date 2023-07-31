import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import routes from './app/routes/router'
import sendResponse from './shared/sendResponse'
import httpStatus from 'http-status'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', routes)

app.use(globalErrorHandler)

app.get('/', (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Server running successfully',
  })
})

export default app
