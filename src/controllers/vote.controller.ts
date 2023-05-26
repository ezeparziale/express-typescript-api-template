import { Response } from 'express'
import Vote from '../models/vote.model'
import Post from '../models/post.model'
import { RequestWithUserId } from '../interfaces/request.interface'

const createVote = async (req: RequestWithUserId, res: Response): Promise<Response> => {
  const userId = Number(req.userId)
  const { postId, dir } = req.body

  try {
    const post = await Post.findOne({ where: { id: postId } })
    if (post) {
      const existVote = await Vote.findOne({ where: { postId, userId } })
      if (dir === 1) {
        if (existVote) {
          return res.status(409).json({ message: 'Vote already exits' })
        }
        await Vote.create({ postId, userId })
        return res.status(201).json({
          message: 'Succefully added vote',
        })
      } else {
        if (!existVote) {
          return res.status(404).json({ message: 'Vote not exits' })
        }
        await Vote.destroy({ where: { postId, userId } })
        return res.status(201).json({
          message: 'Succefully deleted vote',
        })
      }
    } else {
      return res.status(404).json({ message: 'Post not found' })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error voting',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const voteController = {
  createVote,
}

export default voteController
