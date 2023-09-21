import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { UserLogin, UserType } from './user.interface'
import { User } from './user.model'
import { JwtHelper } from '../../../shared/jwtHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import randomstring from 'randomstring'
import { errorLogger, logger } from '../../../shared/logger'
import { ParsedQs } from 'qs'
import { RedisClient } from '../../../shared/redis'
import { EVENT_USER_CREATED } from './user.constant'

const sendResetPasswordWithMail = (
  name: string,
  email: string,
  token: string,
) => {
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: 25,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  })

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: 'Rest your Feribd website password',
    html:
      '<h3>Dear honorable user ' +
      name +
      ',</h3><p> Please click on the following link to <a href="http://localhost:5000/api/v1/users/reset-password/?token=' +
      token +
      '"> reset your password </a></p>',
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      errorLogger.error('Error sending email:', error)
    } else {
      logger.info('Email sent:', info.response)
    }
  })
}

const signup = async (userData: UserType) => {
  const user = await User.create(userData)

  const { _id: userId, email: userEmail, role } = user
  const accessToken = JwtHelper.createToken(
    { userId, userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = JwtHelper.createToken(
    { userId, userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string,
  )

  if (user) {
    await RedisClient.publish(EVENT_USER_CREATED, JSON.stringify(user))
  }

  return {
    user,
    accessToken,
    refreshToken,
  }
}

const login = async (userData: UserLogin) => {
  const { email, password } = userData

  const user = new User()
  const isUserExist = await user.isUserExist(email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExist.password &&
    !(await user.isPasswordMatch(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match')
  }

  const { _id: userId, email: userEmail, role } = isUserExist
  const accessToken = JwtHelper.createToken(
    { userId, userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  const refreshToken = JwtHelper.createToken(
    { userId, userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email: email })

  if (user) {
    const resetToken = randomstring.generate()
    await User.updateOne(
      { _id: user!._id },
      { $set: { token: resetToken } },
      { new: true },
    )
    const name = user?.firstName + ' ' + user?.lastName
    sendResetPasswordWithMail(name, user!.email, resetToken)
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "The user doesn't exist")
  }
}

const resetPassword = async (
  token: string | string[] | ParsedQs | ParsedQs[] | undefined,
  password: string,
) => {
  const isUserExist = await User.findOne({ token: token })

  if (isUserExist) {
    isUserExist.password = password
    isUserExist.save()
    await User.findByIdAndUpdate(
      { _id: isUserExist._id },
      { token: '' },
      { new: true },
    )
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This token has been expired')
  }
}

export const UserService = {
  signup,
  login,
  forgetPassword,
  resetPassword,
}
