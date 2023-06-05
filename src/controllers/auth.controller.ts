import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.model'
import { createAccessToken } from '../utils/jwt.util'
import { SALT } from '../configs/general.config'

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ where: { email: username } })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createAccessToken({ sub: user.id })

      return res.status(200).json({ token_type: 'bearer', access_token: token })
    } else {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error)
      return res.status(500).json({
        message: 'Error login user',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

const registerUser = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body

  try {
    if (!(username && password)) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const userExists = await User.findOne({ where: { email: username } })

    if (userExists) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const passwordHash = await bcrypt.hash(req.body.password, SALT)

    const newUser = await User.create({
      email: username,
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
        message: 'An error occurred while creating a user',
        error: error.message,
      })
    } else {
      console.error('Unexpected error: ', error)
      throw error
    }
  }
}

export { loginUser, registerUser }

const authController = {
  loginUser,
  registerUser,
}

export default authController
