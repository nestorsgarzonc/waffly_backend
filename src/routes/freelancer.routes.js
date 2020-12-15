import { Router } from 'express'

import * as freelancerController from '../controllers/freelancer_controller'
import * as token from '../middleware/auth_token'

const router = Router()
//TODO: add freelancer middleware
router.get('/', freelancerController.findAllFreelancers)

router.get('/:id', freelancerController.findFreelancerById)

router.put('/:id', [token.checkToken], freelancerController.updateFreelancer)

router.delete('/:id', [token.checkToken], freelancerController.deleteFreelancer)

export default router;