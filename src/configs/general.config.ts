import dotenv from 'dotenv'

dotenv.config()

// Server
export const PORT: number = Number(process.env.PORT) || 3000
export const BACKEND_CORS_ORIGINS: string = process.env.BACKEND_CORS_ORIGINS || '*'

// Jwt
export const SECRET_KEY: string = process.env.SECRET_KEY || ''
export const ALGORITHM: string = process.env.ALGORITHM || 'HS256'
export const ACCESS_TOKEN_EXPIRE_MINUTES: number =
  Number(process.env.ACCESS_TOKEN_EXPIRE_MINUTES) || 30

// Postgres Database
export const POSTGRES_HOSTNAME: string = process.env.POSTGRES_HOSTNAME || ''
export const POSTGRES_PORT: number = Number(process.env.POSTGRES_PORT) || 5432
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD || ''
export const POSTGRES_USER: string = process.env.POSTGRES_USER || ''
export const POSTGRES_DB: string = process.env.POSTGRES_DB || ''
