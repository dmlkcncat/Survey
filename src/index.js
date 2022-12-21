import path from 'path'

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

import config from './config'
import loaders from './loaders'
import errorHandler from './middlewares/errorHandler'

import ApiRoutes from './routes'

config()
loaders()

const app = express()

app.use(
  fileUpload({
    createParentPath: true,
  })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(helmet())
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.listen(process.env.APP_PORT, () => {
  console.log('Sunucu ayağa kalktı...')
  app.use('/api', ApiRoutes)
  app.use(errorHandler)
})
