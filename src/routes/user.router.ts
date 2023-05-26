import { Router } from 'express'
import userController from '../controllers/user.controller'
import { requireAuth } from '../middlewares/authenticate.middleware'

const router = Router()

router.post('/', requireAuth, userController.createNewUser)
router.get('/', requireAuth, userController.getAllUser)
router.get('/me', requireAuth, userController.getMe)
router.get('/:userId', requireAuth, userController.getOneUser)
router.put('/:userId', requireAuth, userController.updateOneUser)
router.delete('/:userId', requireAuth, userController.deleteOneUser)

export default router
