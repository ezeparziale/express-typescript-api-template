import { Router } from 'express'
import userController from '../controllers/user.controller'
import { requireAuth } from '../middlewares/authenticate.middleware'
import { validateSchema } from '../middlewares/validateSchema.middleware'
import { userCreateSchema } from '../schemas/user.schema'

const router = Router()

router.post(
  '/',
  requireAuth,
  validateSchema(userCreateSchema),
  userController.createNewUser,
)
router.get('/', requireAuth, userController.getAllUser)
router.get('/me', requireAuth, userController.getMe)
router.get('/:userId', requireAuth, userController.getOneUser)
router.put(
  '/:userId',
  requireAuth,
  validateSchema(userCreateSchema),
  userController.updateOneUser,
)
router.delete('/:userId', requireAuth, userController.deleteOneUser)

export default router
