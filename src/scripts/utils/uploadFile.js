import path from 'path'

const DIR = './uploads/'

export default async (file, name = false) => {
  if (!name) {
    name = Date.now() + '-' + Math.round(Math.random() * 1e9)
    name += path.extname(file.name)
  }

  const filePath = DIR + name

  await file.mv(filePath)

  return filePath
}
