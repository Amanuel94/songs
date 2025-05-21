import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '../constants/index'

class JWT {
  instance: typeof jsonwebtoken = jsonwebtoken
  secret: string

  constructor() {
    this.secret = JWT_SECRET
  }

  signToken(payload: Record<string, any>, expiresIn: jsonwebtoken.SignOptions['expiresIn'] = '12h') {
    const token = this.instance.sign(payload, JWT_SECRET, { expiresIn })

    return token
  }

  verifyToken(token: string) {
    const auth = this.instance.verify(token, JWT_SECRET)
    return auth
  }

  signRefreshToken(payload: Record<string, any>, expiresIn: jsonwebtoken.SignOptions['expiresIn'] = '15d') {
    const token = this.instance.sign(payload, JWT_SECRET, { expiresIn })

    return token
  }
  verifyRefreshToken(token: string) {
    const auth = this.instance.verify(token, this.secret)
    return auth
  }

}

export default new JWT()
