import jwt from 'jsonwebtoken'
import { prisma } from '../db.js'
import { validatePassword } from '../tools/secutity.js'
import { PRIVATE_KEY } from '../config.js'

export const login = async (req, res) => {
  const data = req.body

  if (!data.username) {
    res.status(400).json({ mensaje: 'Username es requerido' })
    return
  }

  if (!data.password) {
    res.status(400).json({ mensaje: 'Password es requerido' })
    return
  }

  const user = await prisma.user.findUnique({
    where: { username: data.username }
  })

  if (!user) {
    res.status(400).json({ mensaje: 'Usuario o clave inválido' })
  }

  const isValidPassword = await validatePassword(data.password, user.password)

  if (!isValidPassword) {
    res.status(401).json({ mensaje: 'Password no válido' })
    return
  }

  const token = jwt.sign({ username: user.username },
    PRIVATE_KEY,
    { expiresIn: '1h' })

  const { password: _, ...validUser } = user
  res.cookie('access_token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  }).send({ user: validUser, token })
}

export const logout = (req, res) => {
  res.clearCookie('access_token').end()
}
