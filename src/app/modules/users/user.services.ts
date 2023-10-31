/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { EVENT_USER_CREATED, EVENT_USER_UPDATED } from './user.constant'

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
    subject: 'Reset your Feribd website password',
    html:
      '<h3>Dear honorable user ' +
      name +
      ',</h3><p>Please click on the following link to <a href ="http://localhost:5005/api/v1/users/reset-password/?token=' +
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

const sendSignUpCode = (name: string, email: string, code: number | null) => {
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
    subject: 'Quick tour plan website signup validation!',
    html: `
        <div style="width: 50%; margin: 0 auto; text-align: center;">
            <h2>Dear valued user ${name},</h2>
            <p>Thank you for signing up on our website. To complete your registration, please enter the verification code below:</p>
            <h1 style="font-size: 2rem; background-color: #007bff; color: #fff; padding: 10px; border-radius: 5px;">${code}</h1>
            <p>If you did not request this code, please ignore this message.</p>
            <p>Thank you for choosing our services!</p>
        </div>`,
  }

  transporter.sendMail(
    mailOptions,
    function (error: any, info: { response: any }) {
      if (error) {
        console.error('Error sending email:', error)
      } else {
        console.info('Email sent:', info.response)
      }
    },
  )
}

const signup = async (userData: UserType) => {
  const min = 100000
  const max = 999999
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min

  userData.confirmedCode = randomNum
  const user = await User.create(userData)

  const { _id: userId, email: userEmail, role } = user
  const accessToken = JwtHelper.createToken(
    { userId, userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  await sendSignUpCode(user.firstName, user.email, user.confirmedCode)

  return accessToken
}

const confirmedSignup = async (data: any, userEmail: string) => {
  const user = new User()
  const isUserExist = await user.isUserExist(userEmail)

  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email not found!')
  }

  if (isUserExist.confirmedCode === data.confirmedCode) {
    await user.updateOne(
      { email: userEmail },
      {
        validation: true,
        confirmedCode: 0,
      },
    )
  }

  if (user) {
    await RedisClient.publish(EVENT_USER_CREATED, JSON.stringify(user))
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

const updateUserProfile = async (id: string, e: any) => {
  const user = await User.findByIdAndUpdate(
    { _id: id },
    {
      contactNo: e?.contactNo,
      presentAddress: e?.presentAddress,
      profileImage: e?.profileImage,
      shopName: e?.shopName,
      shopContactNo: e?.shopContactNo,
      country: e?.country,
      division: e?.division,
      district: e?.district,
      area: e?.ares,
      nidNumber: e?.nidNumber,
      treadLicenseNo: e?.treadLicenseNo,
    },
    { new: true },
  )

  if (user) {
    await RedisClient.publish(EVENT_USER_UPDATED, JSON.stringify(user))
  }

  return user
}

export const UserService = {
  signup,
  login,
  forgetPassword,
  resetPassword,
  updateUserProfile,
  confirmedSignup,
}
