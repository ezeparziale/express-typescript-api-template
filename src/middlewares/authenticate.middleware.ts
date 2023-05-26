import { Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt.util'
import { RequestWithUserId } from '../interfaces/request.interface'

interface IPayload {
  sub: number
}

export function requireAuth(req: RequestWithUserId, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    const decoded = <IPayload>verifyToken(token)
    req.userId = decoded.sub as number
    return next()
  }
  return res.status(401).json({ message: 'Could not validate credentials' })
}
