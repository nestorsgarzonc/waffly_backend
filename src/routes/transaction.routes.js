import { Router } from 'express/Router'
import * as token from '../middleware/auth_token'
import * as tokenController from '../controllers/user_controller'

const router = Router()

router.get('/', [token.checkUserToken], getTransactions)

router.get('/:id', [token.checkUserToken], getTransactionsByID)

router.get('/:user_id', [token.checkUserToken], getTransactionsByUserID)

router.get('/:freelancer_id', [token.checkUserToken], getTransactionsByFreelancerID)

router.post('/', [token.checkUserToken], addNewTransaction)

module.exports = router