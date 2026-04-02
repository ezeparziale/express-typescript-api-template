import { Router } from "express"
import postController from "../controllers/post.controller"
import { requireAuth } from "../middlewares/authenticate.middleware"
import { validateSchema } from "../middlewares/validateSchema.middleware"
import { postCreateSchema, postEditSchema } from "../schemas/post.schema"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Post ID
 *           example: 1
 *         title:
 *           type: string
 *           description: Post title
 *           example: My first post
 *         content:
 *           type: string
 *           description: Post content
 *           example: This is the content of my first post
 *         published:
 *           type: boolean
 *           description: Post published status
 *           example: true
 *         author_id:
 *           type: integer
 *           description: Post author ID
 *           example: 1
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Post creation date
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: Post last update date
 *     PostCreate:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           example: My first post
 *         content:
 *           type: string
 *           example: This is the content of my first post
 *         published:
 *           type: boolean
 *           example: false
 *     PostEdit:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - published
 *       properties:
 *         title:
 *           type: string
 *           example: Updated post title
 *         content:
 *           type: string
 *           example: Updated post content
 *         published:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostCreate'
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  requireAuth,
  validateSchema(postCreateSchema),
  postController.createNewPost,
)

/**
 * @swagger
 * /api/v1/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/", requireAuth, postController.getAllPosts)

/**
 * @swagger
 * /api/v1/posts/{postId}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.get("/:postId", requireAuth, postController.getSinglePost)

/**
 * @swagger
 * /api/v1/posts/{postId}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostEdit'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:postId",
  requireAuth,
  validateSchema(postEditSchema),
  postController.updateOnePost,
)

/**
 * @swagger
 * /api/v1/posts/{postId}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [Posts]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Post ID
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:postId", requireAuth, postController.deleteOnePost)

export default router
