import { Router } from 'express'
import { body } from 'express-validator'

import * as authController from '../controllers/auth_controller'

const router = Router()

router.post(
    '/user/login',
    [body('email').isEmail().withMessage('Ingresa un email valido')],
    authController.userLogin
)

router.post(
    '/user/signup',
    [
        body('email').isEmail().withMessage('Ingresa un email valido'),
        body('img').isURL().withMessage('Ingresa un link valido'),
    ],
    authController.userSignUp
)

router.post(
    '/freelancer/login',
    [body('email').isEmail().withMessage('Ingresa un email valido')],
    authController.freelancerLogin
)

router.post(
    '/freelancer/signup',
    [
        body('email').isEmail().withMessage('Ingresa un email valido'),
        body('img').isURL().withMessage('Ingresa un link valido'),
    ],
    authController.freelancerSignUp
)

export default router
