export default (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body)
  if (error) {
    const errorMessage = error.details?.map((details) => details.message).join(', ')
    res.status(400).json({ error: errorMessage })
    return
  }

  Object.assign(req, value)
  next()
}
