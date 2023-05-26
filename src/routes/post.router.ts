import { Router } from 'express'
import postController from '../controllers/post.controller'
import { requireAuth } from '../middlewares/authenticate.middleware'

const router = Router()

router.post('/', requireAuth, postController.createNewPost)
router.get('/', requireAuth, postController.getAllPosts)
router.get('/:postId', requireAuth, postController.getSinglePost)
router.put('/:postId', requireAuth, postController.updateOnePost)
router.delete('/:postId', requireAuth, postController.deleteOnePost)

export default router
