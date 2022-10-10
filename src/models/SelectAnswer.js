import { Schema, model } from 'mongoose'

const SelectAnswerSchema = new Schema(
  {
    options: [Schema.Types.ObjectId],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default model('select-answer', SelectAnswerSchema)
