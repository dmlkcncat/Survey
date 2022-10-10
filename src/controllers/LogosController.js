import BaseController from './BaseController'
import LogosService from '../services/LogosService'

export default class LogosController extends BaseController {
  constructor() {
    super(new LogosService())
  }

  insert = (req, res) => {
    req.body.path = req.file.path
    this.service
      .insert(req.body)
      .then((response) => res.status(201).send(response))
      .catch((e) => res.status(500).send(e))
  }
}
