import BaseController from './BaseController'
import AnswersService from '../services/AnswersService'

export default class SurveysController extends BaseController {
  constructor() {
    super(new AnswersService())
  }
}
