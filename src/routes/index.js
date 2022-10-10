import { Router } from 'express'

import SurveysRoutes from './Surveys'
import AnswersRoutes from './Answers'
import LogosRoutes from './Logos'

const router = Router()

router.use('/surveys', SurveysRoutes)
router.use('/answers', AnswersRoutes)
router.use('/logos', LogosRoutes)

export default router
