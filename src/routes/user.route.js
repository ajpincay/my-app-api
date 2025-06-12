import { Router } from 'express'
import { createUser, getUserById, getUsers } from '../controllers/user.controller.js'

const userRouter = Router()

userRouter.get('', getUsers)
userRouter.get('/:id', getUserById)
userRouter.post('', createUser)

export default userRouter
