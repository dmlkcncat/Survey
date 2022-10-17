import BaseController from './BaseController'
import SurveysService from '../services/SurveysService'

export default class SurveysController extends BaseController {
  constructor() {
    super(new SurveysService())
  }

  getById = (req, res) => {
    this.service
      .get({ _id: req.params.id })
      .then((response) => res.status(200).send(response))
      .catch((e) => res.status(500).send(e))
  }
}
