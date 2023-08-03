import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { CommonService } from './service'

//* Color controller
const addColor = catchAsync(async (req: Request, res: Response) => {
  const colorData = req.body
  const result = await CommonService.addColor(colorData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color added successfully',
    data: result,
  })
})

const getColors = catchAsync(async (req: Request, res: Response) => {
  const result = await CommonService.getColors()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All colors retrieved successfully',
    data: result,
  })
})

const editColor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const colorData = req.body.name
  const result = await CommonService.editColor(colorData, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color edited successfully',
    data: result,
  })
})

const deleteColor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await CommonService.deleteColor(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color deleted successfully',
    data: result,
  })
})

//* Size controller
const addSize = catchAsync(async (req: Request, res: Response) => {
  const sizeData = req.body
  const result = await CommonService.addSize(sizeData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size added successfully',
    data: result,
  })
})

const getSizes = catchAsync(async (req: Request, res: Response) => {
  const result = await CommonService.getSizes()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All sizes retrieved successfully',
    data: result,
  })
})

const editSize = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const sizeData = req.body.name
  const result = await CommonService.editSize(sizeData, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size edited successfully',
    data: result,
  })
})

const deleteSize = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await CommonService.deleteSize(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size deleted successfully',
    data: result,
  })
})

//* Weight controller
const addWeight = catchAsync(async (req: Request, res: Response) => {
  const weightData = req.body
  const result = await CommonService.addWeight(weightData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Weight added successfully',
    data: result,
  })
})

const getWeights = catchAsync(async (req: Request, res: Response) => {
  const result = await CommonService.getWeights()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All weights retrieved successfully',
    data: result,
  })
})

const editWeight = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const weightData = req.body.name
  const result = await CommonService.editWeight(weightData, id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Weight edited successfully',
    data: result,
  })
})

const deleteWeight = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await CommonService.deleteWeight(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Weight deleted successfully',
    data: result,
  })
})

export const CommonController = {
  addColor,
  getColors,
  editColor,
  deleteColor,
  addSize,
  getSizes,
  editSize,
  deleteSize,
  addWeight,
  getWeights,
  editWeight,
  deleteWeight,
}
