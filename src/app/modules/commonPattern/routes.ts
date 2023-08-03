import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { CommonValidation } from './validation'
import { CommonController } from './controller'
const router = express.Router()

//* Color routes

router.patch(
  '/edit-color/:id',
  validateRequest(CommonValidation.updateColorZodSchema),
  CommonController.editColor,
)

router.get('/get-color', CommonController.getColors)

router.delete('/delete-color/:id', CommonController.deleteColor)

router.post(
  '/add-color',
  validateRequest(CommonValidation.createColorZodSchema),
  CommonController.addColor,
)

//* Size routes
router.patch(
  '/edit-size/:id',
  validateRequest(CommonValidation.updateSizeZodSchema),
  CommonController.editSize,
)

router.delete('/delete-size/:id', CommonController.deleteSize)

router.post(
  '/add-size',
  validateRequest(CommonValidation.createSizeZodSchema),
  CommonController.addSize,
)

//* weight routes
router.patch(
  '/edit-weight/:id',
  validateRequest(CommonValidation.updateWeightZodSchema),
  CommonController.editWeight,
)

router.delete('/delete-weight/:id', CommonController.deleteWeight)

router.post(
  '/add-weight',
  validateRequest(CommonValidation.createWeightZodSchema),
  CommonController.addWeight,
)

export const CommonRoutes = router
