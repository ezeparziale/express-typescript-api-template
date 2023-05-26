import Joi from 'joi'

const voteSchema = Joi.object({
  postId: Joi.number().required(),
  dir: Joi.number().valid(-1, 1).required(),
})

export = { voteSchema }
