import express, { Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { BACKEND_CORS_ORIGINS } from './configs/general.config'
import healthRouter from './routes/health.router'
import postRouter from './routes/post.router'
import userRouter from './routes/user.router'
import authRouter from './routes/auth.router'
import voteRouter from './routes/vote.router'
import { swaggerSpec } from './utils/swagger.util'
import swaggerUi from 'swagger-ui-express'

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

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes
app.use('/health', healthRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/vote', voteRouter)

export default app
