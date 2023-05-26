import Joi from 'joi'

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).options({ allowUnknown: false })

export const postCreateSchema = postSchema.keys({
  published: Joi.boolean().default(false),
})

export const postEditSchema = postSchema.keys({
  published: Joi.boolean().required(),
})
