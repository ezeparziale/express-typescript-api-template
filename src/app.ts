import express from 'express'
import morgan from 'morgan'
import healthRouter from './routes/health.router'

const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.get('/ping', (_, res) => {
  console.log('Process ping request')
  res.send('pong')
})

app.use('/health', healthRouter)

export default app
