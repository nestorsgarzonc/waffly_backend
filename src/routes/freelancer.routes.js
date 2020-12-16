import { Router } from 'express'

import * as freelancerController from '../controllers/freelancer_controller'
import * as token from '../middleware/auth_token'

const router = Router()

router.get('/', freelancerController.findAllFreelancers)

router.get('/:id', freelancerController.findFreelancerById)

router.put('/:id', [token.checkFreelancerToken], freelancerController.updateFreelancer)

router.delete('/:id', [token.checkFreelancerToken], freelancerController.deleteFreelancer)

export default router;