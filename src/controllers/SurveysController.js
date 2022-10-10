import BaseController from './BaseController'
import SurveysService from '../services/SurveysService'

export default class SurveysController extends BaseController {
  constructor() {
    super(new SurveysService())
  }
}
