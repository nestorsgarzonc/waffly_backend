"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _express = require("express");

var token = _interopRequireWildcard(require("../middleware/auth_token"));

var transactionController = _interopRequireWildcard(require("../controllers/transaction_controller"));

var router = (0, _express.Router)();
router.get('/', [token.checkToken], transactionController.getTransactions);
router.get('/:id', [token.checkToken], transactionController.getTransactionsByID);
router.get('/byUser/:user_id', [token.checkToken], transactionController.getTransactionsByUserID);
router.get('/byFreelancer/:freelancer_id', [token.checkToken], transactionController.getTransactionsByFreelancerID);
router.post('/', [token.checkUserToken], transactionController.addNewTransaction);
module.exports = router;