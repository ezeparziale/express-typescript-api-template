import { Router } from 'express'
import voteController from '../controllers/vote.controller'
import { requireAuth } from '../middlewares/authenticate.middleware'

const router = Router()

router.post('/', requireAuth, voteController.createVote)

export default router
