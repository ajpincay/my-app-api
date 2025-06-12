import express from 'express'
import { PORT } from './config.js'
import morgan from 'morgan'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import { logRequest, logSpecificRequest } from './middlewares/loggerMiddleware.js'
import { VerificarToken } from './middlewares/authMiddleware.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())
//app.use(morgan('dev'))

//app.use(logRequest)

app.use('/users', VerificarToken, userRouter)
app.use(authRouter)

app.get('/', logSpecificRequest, (req, res) => {
  res.send('Hola Mundo')
})

app.listen(PORT, () => console.log(`Listening in port ${PORT}`))
