import jwt, { Secret, Algorithm } from 'jsonwebtoken'
import {
  SECRET_KEY,
  ALGORITHM,
  ACCESS_TOKEN_EXPIRE_MINUTES,
} from '../configs/general.config'

export const createAccessToken = (payload: string | object): string => {
  const token = jwt.sign(payload, SECRET_KEY as Secret, {
    expiresIn: 60 * (ACCESS_TOKEN_EXPIRE_MINUTES as number),
    algorithm: ALGORITHM as Algorithm,
  })
  return token
}

export const verifyToken = (token: string): string | object | null => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    return decoded
  } catch (error) {
    return null
  }
}
