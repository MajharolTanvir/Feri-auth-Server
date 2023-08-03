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
    message: 'Category added successfully',
    data: result,
  })
})

const editCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const categoryData = req.body.name
  const result = await CategoryService.editCategory(categoryData, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category edited successfully',
    data: result,
  })
})

export const CategoryController = {
  addCategory,
  editCategory,
}
