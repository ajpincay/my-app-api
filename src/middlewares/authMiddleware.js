import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config.js'

const VerificarToken = (req, res, next) => {
  req.session = { user: null }

  if (!req.cookies) {
    return res.status(401).send('Acceso no permitido')
  }

  const token = req.cookies.access_token
  if (!token) {
    return res.status(401).send('Acceso no permitido')
  }

  try {
    const payload = jwt.verify(token, PRIVATE_KEY)
    req.session.user = payload.username
    next()
  } catch (error) {
    return res.status(403).send(error)
  }
}

export { VerificarToken }
