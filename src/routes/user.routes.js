import { Router } from 'express'

import * as userController from '../controllers/user_controller'
import * as token from '../middleware/auth_token'

const router = Router()

router.get('/', userController.findAllUsers)

router.get('/:id', userController.findUserById)

router.put('/:id', [token.checkToken], userController.updateUser)

router.put('/addService/:id', [token.checkToken], userController.addToServiceHistory)

router.delete('/:id', [token.checkToken], userController.deleteUser)

export default router;