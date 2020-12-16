import { Router } from 'express'

import * as userController from '../controllers/user_controller'
import * as token from '../middleware/auth_token'

const router = Router()

router.get('/', userController.findAllUsers)

router.get('/:id', userController.findUserById)

router.put('/:id', [token.checkUserToken], userController.updateUser)

router.put('/addService/:id', [token.checkUserToken], userController.addToServiceHistory)

router.delete('/:id', [token.checkUserToken], userController.deleteUser)
//TODO: add security layer doing: if username match

export default router;