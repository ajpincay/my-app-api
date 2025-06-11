import { Router } from 'express'
import { createUser, getUserById, getUsers } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('/users', getUsers)
userRouter.get('/users/:id', getUserById)
userRouter.post('/users', createUser)

export default userRouter
