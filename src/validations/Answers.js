import Joi from 'joi'

const textAnswer = Joi.object({
  answer: Joi.string().required(),
}).required()

const selectAnswer = Joi.object({
  options: Joi.array().items(Joi.string().required()).required(),
}).required()

const answer = Joi.object({
  question: Joi.string().required(),
  answer: [textAnswer, selectAnswer],
  answerType: Joi.valid('text-answer', 'select-answer').required(),
}).required()

export const createValidation = Joi.object({
  survey: Joi.string().required(),
  answers: Joi.array().items(answer).required(),
})

export const deleteValidation = Joi.object({
  id: Joi.string().required(),
})
