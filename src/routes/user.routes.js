import { Router } from 'express'
import * as userController from '../controllers/user_controller'
const router = Router()

router.get('/', userController.findAllUsers)

router.get('/:id', userController.findUserById)

router.post('/', userController.postUser)

router.put('/:id', userController.updateUser)

router.put('/addService/:id', userController.addToServiceHistory)

router.delete('/:id', userController.deleteUser)

export default router;