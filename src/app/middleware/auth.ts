import { NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import config from '../../config'
import { Secret } from 'jsonwebtoken'
import { JwtHelper } from '../../shared/jwtHelper'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get authorization token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }
      // verify token
      let verifiedUser = null

      verifiedUser = JwtHelper.verifyToken(token, config.jwt.secret as Secret)

      req.user = verifiedUser
      // Setup guard
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden')
      }

      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
