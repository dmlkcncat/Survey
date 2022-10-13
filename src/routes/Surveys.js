import { Router } from 'express'
import validate from '../middlewares/validate'
import SurveysController from '../controllers/SurveysController'
import { createValidation, deleteValidation } from '../validations/Surveys'

const router = Router()
const controller = new SurveysController()

router.get('/', controller.list)
router.route('/').post(validate(createValidation), controller.insert)
router.route('/').delete(validate(deleteValidation), controller.delete)

export default router
