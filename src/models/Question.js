import { Schema, model } from 'mongoose'

const QuestionSchema = new Schema(
  {
    questionType: {
      type: String,
      required: true,
      enum: ['text', 'select', 'rate'],
    },
    question: {
      type: Schema.Types.ObjectId,
      refPath: 'questionType',
    },
    required: { type: Boolean, reqired: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default model('question', QuestionSchema)
