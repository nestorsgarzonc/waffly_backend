import { Router } from 'express';
import * as token from '../middleware/auth_token';
import * as transactionController from '../controllers/transaction_controller';

const router = Router();

router.get('/', [token.checkToken], transactionController.getTransactions);

router.get('/:id', [token.checkToken], transactionController.getTransactionsByID);

router.get('/byUser/:user_id', [token.checkToken], transactionController.getTransactionsByUserID);

router.get('/byFreelancer/:freelancer_id', [token.checkToken], transactionController.getTransactionsByFreelancerID);

router.post('/', [token.checkUserToken], transactionController.addNewTransaction);

module.exports = router;
