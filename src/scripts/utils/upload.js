import multer from 'multer'

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

export const upload = Object.freeze(multer({ storage }))
