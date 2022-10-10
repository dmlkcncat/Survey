import Joi from 'joi'

const textQuestion = Joi.object({
  questionType: Joi.valid('text').required(),
  required: Joi.boolean().required(),
  question: Joi.object({
    title: Joi.string().required(),
  }).required(),
}).required()

const selectQuestion = Joi.object({
  questionType: Joi.valid('select').required(),
  required: Joi.boolean().required(),
  question: Joi.object({
    title: Joi.string().required(),
    multiSelect: Joi.boolean().required(),
    options: Joi.array()
      .items(
        Joi.object({
          option: Joi.string().required(),
        })
      )
      .required(),
  }).required(),
}).required()

const questions = Joi.array().items(Joi.alternatives().try(textQuestion, selectQuestion)).required()

export const createValidation = Joi.object({
  title: Joi.string().required(),
  firstTitle: Joi.string().required(),
  finishTitle: Joi.string().required(),
  active: Joi.boolean().required(),
  questions,
  logo: Joi.string().required(),
})

export const deleteValidation = Joi.object({
  id: Joi.string().required(),
})
