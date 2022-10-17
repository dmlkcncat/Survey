import { Schema, model } from 'mongoose'

const matrixSchema = new Schema({
  row: Schema.Types.ObjectId,
  col: Schema.Types.ObjectId,
})

const RateAnswerSchema = new Schema(
  {
    matrix: [matrixSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default model('rate-answer', RateAnswerSchema)
