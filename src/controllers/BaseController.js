export default class BaseController {
  /**
   *
   * @param {import('../services/BaseService').default} service
   */
  constructor(service) {
    this.service = service
  }

  list = (req, res) => {
    this.service
      .list()
      .then((response) => res.status(200).send(response))
      .catch((e) => res.status(500).send(e))
  }

  insert = (req, res) => {
    this.service
      .insert(req.body)
      .then((response) => res.status(201).send(response))
      .catch((e) => res.status(500).send(e))
  }

  delete = (req, res) => {
    this.service
      .delete(req.body.id)
      .then((response) => res.status(200).send(response))
      .catch((e) => res.status(500).send(e))
  }

  getById = (req, res) => {
    this.service
      .get({ _id: req.params.id })
      .then((response) => res.status(200).send(response))
      .catch((e) => res.status(500).send(e))
  }
}
