import { Router } from 'express'
import LogosController from '../controllers/LogosController'
import validate from '../middlewares/validate'
import { createValidationBody, createValidationFile } from '../validations/Logos'

const router = Router()
const controller = new LogosController()

router.get('/:id', controller.getById)
router.get('/', controller.list)
router
  .route('/')
  .post(validate(createValidationBody), validate(createValidationFile, 'files'), controller.insert)

export default router
