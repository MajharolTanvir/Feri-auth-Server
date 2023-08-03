import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { SubCategoryValidation } from './subCategory.validation'
import { SubCategoryController } from './subCategory.controller'
const router = express.Router()

router.patch(
  '/edit-sub-category/:id',
  validateRequest(SubCategoryValidation.updateSubCategoryZodSchema),
  SubCategoryController.editSubCategory,
)

router.get('/get-subcategories', SubCategoryController.getAllSubCategory)

router.delete(
  '/delete-sub-category/:id',
  SubCategoryController.deleteSubCategory,
)

router.post(
  '/add-sub-category',
  validateRequest(SubCategoryValidation.createSubCategoryZodSchema),
  SubCategoryController.addSubCategory,
)

export const SubCategoryRoutes = router
