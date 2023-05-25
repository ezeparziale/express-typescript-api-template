import express, { Router } from 'express'
import { getHealthStatus } from '../controllers/health.controller'

const router: Router = express.Router()

router.get('/', getHealthStatus)

export default router
