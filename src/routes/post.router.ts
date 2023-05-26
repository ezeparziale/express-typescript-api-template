import { Router } from 'express'
import postController from '../controllers/post.controller'
import { requireAuth } from '../middlewares/authenticate.middleware'
import { validateSchema } from '../middlewares/validateSchema.middleware'
import { postCreateSchema, postEditSchema } from '../schemas/post.schema'

const router = Router()

router.post(
  '/',
  requireAuth,
  validateSchema(postCreateSchema),
  postController.createNewPost,
)
router.get('/', requireAuth, postController.getAllPosts)
router.get('/:postId', requireAuth, postController.getSinglePost)
router.put(
  '/:postId',
  requireAuth,
  validateSchema(postEditSchema),
  postController.updateOnePost,
)
router.delete('/:postId', requireAuth, postController.deleteOnePost)

export default router
