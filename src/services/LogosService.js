import BaseService from './BaseService'
import Logo from '../models/Logo'

export default class LogosService extends BaseService {
  constructor() {
    super(Logo)
  }
}
