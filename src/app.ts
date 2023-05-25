import express from 'express'
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
app.use(express.json())

// Routes
app.get('/ping', (_, res) => {
  console.log('Process ping request')
  res.send('pong')
})

app.use('/health', healthRouter)

export default app
