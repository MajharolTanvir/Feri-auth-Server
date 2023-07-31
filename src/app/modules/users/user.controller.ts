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

export const UserController = {
  signup,
}
