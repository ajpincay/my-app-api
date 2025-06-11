import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../config.js'

export const encryptPassword = async (password) => {
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashPassword
}

export const validatePassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword)
  return isValid
}
