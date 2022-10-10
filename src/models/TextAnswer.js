import { Schema, model } from 'mongoose'

const TextAnswerSchema = new Schema(
  {
    answer: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default model('text-answer', TextAnswerSchema)
