import express from 'express'
import { CategoryValidation } from './category.validation'
import { CategoryController } from './category.controller'
import validateRequest from '../../middleware/validateRequest'
const router = express.Router()

router.patch(
  '/edit-category/:id',
  validateRequest(CategoryValidation.updateCategoryZodSchema),
  CategoryController.editCategory,
)

router.get('/get-categories', CategoryController.getAllCategory)

router.delete('/delete-category/:id', CategoryController.deleteCategory)

router.post(
  '/add-category',
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.addCategory,
)

export const CategoryRoutes = router
