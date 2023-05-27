import { Request, Response } from 'express'
import { Sequelize } from 'sequelize'
import Post from '../models/post.model'
import User from '../models/user.model'
import Vote from '../models/vote.model'
import { RequestWithUserId } from '../interfaces/request.interface'

const getAllPosts = async (req: Request, res: Response): Promise<Response> => {
  const page: number = Number(req.query.page) || 1
  const limit: number = Number(req.query.limit) || 20
  const offset: number = (page - 1) * limit

  try {
    const posts = await Post.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('vote.postId')), 'votes']],
      },
      include: [
        {
          model: User,
          attributes: ['id', 'email'],
          required: false,
        },
        {
          model: Vote,
          attributes: [],
          duplicating: false,
          as: 'vote',
        },
      ],
      group: ['Post.id', 'User.id'],
    })
    return res.status(200).json(posts)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'An error occurred while retrieving posts',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const getSinglePost = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.postId

  try {
    const post = await Post.findOne({
      where: { id },
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('vote.postId')), 'votes']],
      },
      include: [
        {
          model: User,
          attributes: ['id', 'email'],
        },
        {
          model: Vote,
          attributes: [],
          as: 'vote',
        },
      ],
      group: ['Post.id', 'User.id'],
    })
    if (post) {
      return res.status(200).json(post)
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'An error occurred while retrieving the post',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const createNewPost = async (
  req: RequestWithUserId,
  res: Response,
): Promise<Response> => {
  const authorId = req.userId
  try {
    const newPost = await Post.create({ ...req.body, authorId })
    return res.status(201).json({
      message: 'Post created',
      postId: newPost.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error creating post',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const updateOnePost = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.postId

  try {
    const post = await Post.findOne({ where: { id } })

    if (post) {
      await Post.update(req.body, { where: { id } })
      return res.status(200).json({ message: 'Post updated' })
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error updating post',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const deleteOnePost = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.postId
  try {
    const deletePost = await Post.destroy({ where: { id } })
    if (deletePost) {
      return res.status(204).json({ message: 'Post deleted' })
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error deleting post',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const postController = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updateOnePost,
  deleteOnePost,
}

export default postController
