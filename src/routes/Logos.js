import { Router } from 'express'
import LogosController from '../controllers/LogosController'
import { upload } from '../scripts/utils/upload'

const router = Router()
const controller = new LogosController()

router.get('/:id', controller.getById)
router.get('/', controller.list)
router.post('/', upload.single('logo'), controller.insert)

export default router
