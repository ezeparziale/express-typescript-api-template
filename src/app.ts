import express, { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { BACKEND_CORS_ORIGINS } from './configs/general.config'
import healthRouter from './routes/health.router'

const app = express()

// Middlewares
const corsOptions: CorsOptions = {
  origin: BACKEND_CORS_ORIGINS,
  credentials: true,
  methods: '*',
  allowedHeaders: '*',
}
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
  express.json({
    verify: (_req: Request, res: Response, buf: Buffer, encoding: BufferEncoding) => {
      try {
        JSON.parse(buf.toString(encoding))
      } catch (e) {
        res.status(400).json({ message: 'Invalid JSON' })
      }
    },
  }),
)

// Routes
app.use('/health', healthRouter)

export default app
