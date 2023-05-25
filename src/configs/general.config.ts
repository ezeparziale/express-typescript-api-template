import dotenv from 'dotenv'

dotenv.config()

// Server
const PORT: string | number = process.env.PORT || 3000

export { PORT }
