import { Schema, model } from 'mongoose'

const ColumnOptionSchema = new Schema({
  column: String,
})
const RowOptionSchema = new Schema({
  row: String,
})

const RateSchema = new Schema(
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

export default model('rate', RateSchema)
