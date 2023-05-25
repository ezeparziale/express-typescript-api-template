import app from './src/app'
import { PORT } from './src/configs/general.config'

// Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})