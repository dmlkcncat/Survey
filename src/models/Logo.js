import { Schema, model } from 'mongoose'

const LogoSchema = new Schema(
  {
    title: String,
    path: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default model('logo', LogoSchema)
