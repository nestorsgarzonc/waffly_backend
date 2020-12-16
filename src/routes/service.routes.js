import { Router } from 'express'
import { body } from 'express-validator'
import * as serviceController from '../controllers/service_controller'
import * as token from '../middleware/auth_token'

const router = Router();

router.get('/', token.checkUserToken, serviceController.findAllServices)

router.get('/:id', token.checkUserToken, serviceController.findServiceById)

router.post(
    '/addService/:id',
    [
        token.checkUserToken,
        body('img').isURL().withMessage('Ingresa un link valido'),
    ],
    serviceController.createService
)

router.post('/reviews/:id', [token.checkUserToken], serviceController.addReviewToProduct)

router.delete('/:id', token.checkUserToken, serviceController.deleteService)

//TODO: add find by category
export default router;