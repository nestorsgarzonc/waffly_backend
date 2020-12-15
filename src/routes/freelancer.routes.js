import { Router } from 'express'
import { body } from 'express-validator'

import * as freelancerController from '../controllers/freelancer_controller'
import * as token from '../middleware/auth_token'

const router = Router()
//TODO: add freelancer middleware
router.get('/', freelancerController.findAllFreelancers)

router.get('/:id', freelancerController.findFreelancerById)

router.put('/:id', [token.checkToken], freelancerController.updateFreelancer)

//Id of the freelancer
router.post(
    '/addService/:id',
    [
        token.checkToken,
        body('img').isURL().withMessage('Ingresa un link valido'),
    ],
    freelancerController.addService
)

router.delete('/:id', [token.checkToken], freelancerController.deleteFreelancer)

export default router;