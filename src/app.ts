import express from 'express'
import healthRouter from './routes/health.router'

const app = express()

app.use(express.json())

app.get('/ping', (_, res) => {
  console.log('Process ping request')
  res.send('pong')
})

// Routes
app.use('/health', healthRouter)

export default app
