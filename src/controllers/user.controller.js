import cache from '../cache.js'
import { prisma } from '../db.js'
import { encryptPassword } from '../tools/secutity.js'

export const getUsers = async (req, res) => {
  console.log(`Petición hecha por ${req.session.user}`)
  const cacheKeyAllUsers = 'AllUsers'

  if (cache.has(cacheKeyAllUsers)) {
    console.log('Desde la caché')
    const users = cache.get(cacheKeyAllUsers)
    res.json(users)
    return
  }

  console.log('Consulta desde la base de datos')
  const users = await prisma.user.findMany({
    omit: {
      password: true
    }
  })
  cache.set(cacheKeyAllUsers, users)
  res.json(users)
}

export const getUserById = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
    omit: { password: true }
  })

  if (!user) {
    res.status(404).json({ mensaje: 'Usuario no encontrado' })
  }

  res.json(user)
}

export const createUser = async (req, res) => {
  const newUser = req.body

  const user = await prisma.user.findUnique({
    where: { username: newUser.username }
  })

  if (user) {
    res.status(400)
      .json({ mensaje: `${user.username} no está disponible` })
    return
  }

  const hashPassword = await encryptPassword(newUser.password)
  newUser.password = hashPassword

  const createdUser = await prisma.user.create({
    data: newUser,
    omit: { password: true }
  })

  res.json(createdUser)
}
