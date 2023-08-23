import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { UserService } from './user.service'

const signup = catchAsync(async (req: Request, res: Response) => {
  const user = req.body
  const result = await UserService.signup(user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signup successfully',
    data: result,
  })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const userData = req.body
  const result = await UserService.login(userData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: result,
  })
})

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body
  const result = await UserService.forgetPassword(email)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset link sent successfully. Please check yor email',
    data: result,
  })
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.query.token
  const { password } = req.body
  const result = await UserService.resetPassword(token, password)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset successfully',
    data: result,
  })
})

export const UserController = {
  signup,
  login,
  forgetPassword,
  resetPassword,
}
