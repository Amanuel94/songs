import express from 'express'
import checkBearerToken from '../middlewares/check-bearer-token'
import errorHandler from '../middlewares/error-handler'
import register from '../controllers/auth/register'
import login from '../controllers/auth/login'
import loginWithToken from '../controllers/auth/login-with-token'
import refreshToken from '../controllers/auth/refresh-token'

const router = express.Router()
router.post('/register', [], register, errorHandler)
router.post('/login', [], login, errorHandler)
router.get('/login', [checkBearerToken], loginWithToken, errorHandler)
router.post('/refresh-token', [], refreshToken,  errorHandler)
export default router
