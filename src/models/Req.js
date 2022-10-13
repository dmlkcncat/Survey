import { Schema, model } from 'mongoose'

const ColumnOptionSchema = new Schema({
  Column: String,
})
const RowOptionSchema = new Schema({
  Row: String,
})

const ReqSchema = new Schema(
  {
    title: String,
    columnOptions: [ColumnOptionSchema],
    rowOptions: [RowOptionSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

export default model('req', ReqSchema)
