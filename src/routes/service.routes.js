import { Router } from 'express'
import { body } from 'express-validator'
import * as serviceController from '../controllers/service_controller'
import * as token from '../middleware/auth_token'

const router = Router();

router.get('/', token.checkToken, serviceController.findAllServices)

router.get('/:id', token.checkToken, serviceController.findServiceById)

router.post(
    '/addService/:id',
    [
        token.checkToken,
        body('img').isURL().withMessage('Ingresa un link valido'),
    ],
    serviceController.createService
)

router.delete('/:id', token.checkToken, serviceController.deleteService)

//TODO: add find by category
export default router;