import { type RequestHandler } from 'express'
import jwt from '../../utils/jwt'
import Account from '../../models/Account'
import { JWT_REFRESH_EXPIRES_IN } from '../../constants'

const loginWithToken: RequestHandler = async (req, res, next) => {
  try {
    const { uid } = req.auth || {}

    // Get account from DB, password is not verified because we're already token-authorized at this point
    const account = await Account.findOne({ _id: uid }).select('-password')

    if (!account) {
      return next({
        statusCode: 400,
        message: 'Bad credentials',
      })
    }

    // Generate access token
    const accessToken = jwt.signToken({ uid: account._id, role: account.role })
    const refreshToken = jwt.signRefreshToken({
      uid: account._id,
      role: account.role,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * JWT_REFRESH_EXPIRES_IN, // 15 days
    });

    res.status(200).json({
      message: 'Succesfully got account',
      data: account,
      accessToken,
      refreshToken,
    })
  } catch (error) {
    next(error)
  }
}

export default loginWithToken
