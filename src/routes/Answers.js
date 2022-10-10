import { Router } from 'express'
import validate from '../middlewares/validate'
import AnswersController from '../controllers/AnswersController'
import { createValidation, deleteValidation } from '../validations/Answers'

const router = Router()
const controller = new AnswersController()

router.get('/:id', controller.getById)
router.get('/', controller.list)
router.route('/').post(validate(createValidation), controller.insert)
// router.route('/').delete(validate(deleteValidation), controller.delete)

export default router
