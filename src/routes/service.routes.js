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
        token.checkFreelancerToken,
        body('img').isURL().withMessage('Ingresa un link valido'),
    ],
    serviceController.createService
)

router.post('/reviews/:id', [token.checkUserToken], serviceController.addReviewToProduct)

router.delete('/:id', token.checkFreelancerToken, serviceController.deleteService)

//TODO: add find by category
export default router;