import { Request, Response } from 'express'
import packageJson from '../../package.json'

const getHealthStatus = async (_req: Request, res: Response) => {
  const response = {
    status: 'OK',
    timestamp: new Date(),
    version: packageJson.version,
    uptime: process.uptime(),
  }

  res.status(200).json(response)
}

export { getHealthStatus }
