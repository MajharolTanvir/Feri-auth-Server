import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.signupZodSchema),
  UserController.signup,
)

router.get('/login', UserController.login)
router.post('/forget-password', UserController.forgetPassword)
router.post('/reset-password', UserController.resetPassword)

export const UserRoutes = router
