import { Router } from 'express'
import * as taskController from '../controllers/service_controller'

const router = Router();

router.get('/', taskController.findAllTasks)

router.get('/:id', taskController.findOneTask)

router.post('/', taskController.createTasks)

router.delete('/:id', taskController.deleteOneTask)

export default router;