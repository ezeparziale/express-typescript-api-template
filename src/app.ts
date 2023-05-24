import express from 'express'

const app = express()

app.use(express.json())

app.get('/ping', (_, res) => {
    console.log('Process ping request')
    res.send('pong')
})

export default app