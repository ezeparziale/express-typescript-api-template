import Joi from 'joi'

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
}).options({ allowUnknown: false })

export const userCreateSchema = userSchema
