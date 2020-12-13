import { Router } from 'express'
import * as serviceController from '../controllers/service_controller'

const router = Router();

router.get('/', serviceController.findAllTasks)

router.get('/:id', serviceController.findOneTask)

router.post('/', serviceController.createTasks)

router.delete('/:id', serviceController.deleteOneTask)

export default router;