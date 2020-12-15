import { Router } from 'express'
import { body } from 'express-validator'

import * as authController from '../controllers/auth_controller'

const router = Router()

router.post(
    '/login',
    [body('email').isEmail().withMessage('Ingresa un email valido')],
    authController.userLogin)

router.post(
    '/signup',
    [body('email').isEmail().withMessage('Ingresa un email valido')],
    authController.userSignUp
)

export default router
