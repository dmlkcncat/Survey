import Mongoose from 'mongoose'

const db = Mongoose.connection

db.once('open', () => {
  console.log('DB Bağlantısı Başarılıdır..')
})

const connectDB = async () => {
  await Mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      useNewurlParser: true,
      useUnifiedTopology: true,
    }
  )
}

export { connectDB }
