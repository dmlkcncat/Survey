import BaseController from './BaseController'
import LogosService from '../services/LogosService'
import uploadFile from '../scripts/utils/uploadFile'

export default class LogosController extends BaseController {
  constructor() {
    super(new LogosService())
  }

  insert = async (req, res) => {
    const path = await uploadFile(req.files.logo)
    req.body.path = path
    this.service
      .insert(req.body)
      .then((response) => res.status(201).send(response))
      .catch((e) => res.status(500).send(e))
  }
}
