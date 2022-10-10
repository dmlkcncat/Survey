import { Schema, model } from 'mongoose'

const TextSchema = new Schema(
  {
    title: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default model('text', TextSchema)
