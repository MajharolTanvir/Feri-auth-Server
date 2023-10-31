import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'
import auth from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/users'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(UserValidation.signupZodSchema),
  UserController.signup,
)

router.post(
  '/confirm-signup',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.confirmedSignup,
)

router.post('/login', UserController.login)

router.patch(
  '/profile',
  auth(
    ENUM_USER_ROLE.SELLER,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.MODERATOR,
    ENUM_USER_ROLE.ADMIN,
  ),
  validateRequest(UserValidation.userProfileZodSchema),
  UserController.updateUserProfile,
)
router.post('/forget-password', UserController.forgetPassword)
router.post('/reset-password', UserController.resetPassword)

export const UserRoutes = router
