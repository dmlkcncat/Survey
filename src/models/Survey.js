import { Schema, model } from 'mongoose'

const SurveySchema = new Schema(
  {
    title: String,
    firstTitle: { type: String, required: true },
    finishTitle: { type: String, required: true },
    active: { type: Boolean, reqired: true },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'question',
      },
    ],
    logo: {
      type: Schema.Types.ObjectId,
      ref: 'logo',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default model('survey', SurveySchema)
