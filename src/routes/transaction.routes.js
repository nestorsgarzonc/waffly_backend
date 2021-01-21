import { Router } from 'express'
import * as token from '../middleware/auth_token'
import * as transactionController from '../controllers/transaction_controller'

const router = Router()

router.get('/', [token.checkUserToken], transactionController.getTransactions)

router.get('/:id', [token.checkUserToken], transactionController.getTransactionsByID)

router.get('/byUser/:user_id', [token.checkUserToken], transactionController.getTransactionsByUserID)

router.get('/byFreelancer/:freelancer_id', [token.checkUserToken], transactionController.getTransactionsByFreelancerID)

router.post('/', [token.checkUserToken], transactionController.addNewTransaction)

module.exports = router