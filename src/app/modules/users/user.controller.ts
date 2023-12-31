import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { UserService } from './user.services'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import { JwtHelper } from '../../../shared/jwtHelper'
import ApiError from '../../../errors/ApiError'

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

const confirmedSignup = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.user as JwtPayload
  const result = await UserService.confirmedSignup(req.body, userEmail)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Account has been created successfully',
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

const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
  }

  let verifiedUser = null

  verifiedUser = JwtHelper.verifyToken(token, config.jwt.secret as Secret)

  const result = await UserService.updateUserProfile(
    verifiedUser?.userId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  })
})

export const UserController = {
  signup,
  login,
  forgetPassword,
  resetPassword,
  updateUserProfile,
  confirmedSignup,
}
