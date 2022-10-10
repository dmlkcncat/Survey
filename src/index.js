import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import config from './config'
import loaders from './loaders'

import ApiRoutes from './routes'

config()
loaders()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())

app.listen(process.env.APP_PORT, () => {
  console.log('Sunucu ayağa kalktı...')
  app.use('/api', ApiRoutes)
})
