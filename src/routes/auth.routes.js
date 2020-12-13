import { Router } from 'express'
import * as authController from '../controllers/auth_controller'

const router = Router()

router.post('/login', authController.userLogin)

router.post('/signup', authController.userSignUp)

export default router