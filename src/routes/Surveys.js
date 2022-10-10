import { Router } from 'express'
import validate from '../middlewares/validate'
import SurveysController from '../controllers/SurveysController'
import { createValidation, deleteValidation } from '../validations/Surveys'

import { upload } from '../scripts/utils/upload'

const router = Router()
const controller = new SurveysController()

router.get('/', controller.list)
router.post('/file', upload.single('avatar'), (req, res) => {
  console.log(req.file)
  res.send('test file upload')
})
router.route('/').post(validate(createValidation), controller.insert)
router.route('/').delete(validate(deleteValidation), controller.delete)

export default router
