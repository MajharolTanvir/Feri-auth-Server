import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { CategoryService } from './category.service'

const addCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryData = req.body
  const result = await CategoryService.addCategory(categoryData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signup successfully',
    data: result,
  })
})

export const CategoryController = {
  addCategory,
}
