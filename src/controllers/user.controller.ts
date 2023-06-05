import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.model'
import { RequestWithUserId } from '../interfaces/request.interface'
import { SALT } from '../configs/general.config'

const getAllUser = async (req: Request, res: Response): Promise<Response> => {
  const page: number = Number(req.query.page) || 1
  const limit: number = Number(req.query.limit) || 20
  const offset: number = (page - 1) * limit

  try {
    const posts = await User.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'email'],
    })
    return res.status(200).json(posts)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error fetching users',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const getOneUser = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.userId

  try {
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'email'],
    })
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'An error occurred while retrieving the user',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const createNewUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body
  try {
    const userExists = await User.findOne({ where: { email } })

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const passwordHash = await bcrypt.hash(password, SALT)
    const newUser = await User.create({
      email,
      password: passwordHash,
    })
    return res.status(201).json({
      message: 'User created',
      userId: newUser.id,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error creating user',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const updateOneUser = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.userId
  const { email, password } = req.body

  const passwordHash = await bcrypt.hash(password, SALT)

  try {
    const user = await User.findOne({ where: { id } })

    if (user) {
      await User.update(
        {
          email,
          password: passwordHash,
        },
        { where: { id } },
      )
      return res.status(200).json({ message: 'User updated' })
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error updating user',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const deleteOneUser = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.userId
  try {
    const deleteUser = await User.destroy({ where: { id } })
    if (deleteUser) {
      return res.status(204).json({ message: 'User deleted successfully' })
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error deleting user',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const getMe = async (req: RequestWithUserId, res: Response): Promise<Response> => {
  const id = req.userId

  try {
    const user = await User.findOne({
      where: { id },
      attributes: ['id', 'email'],
    })
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).send()
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'An error occurred while retrieving the user',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const userController = {
  getAllUser,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
  getMe,
}

export default userController
