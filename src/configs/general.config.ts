import dotenv from 'dotenv'

dotenv.config()

// Server
const PORT: string | number = process.env.PORT || 3000
const BACKEND_CORS_ORIGINS: string = process.env.BACKEND_CORS_ORIGINS || '*'

export { PORT, BACKEND_CORS_ORIGINS }
