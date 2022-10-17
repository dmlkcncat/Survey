import { Schema, model } from 'mongoose'

const AnswerSchema = new Schema(
  {
    survey: {
      type: Schema.Types.ObjectId,
      ref: 'survey',
    },
    answers: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: 'question',
        },
        answerType: {
          type: String,
          required: true,
          enum: ['text-answer', 'select-answer', 'rate-answer'],
        },
        answer: {
          type: Schema.Types.ObjectId,
          refPath: 'answers.answerType',
        },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default model('answer', AnswerSchema)
