"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _express = require("express");

var token = _interopRequireWildcard(require("../middleware/auth_token"));

var transactionController = _interopRequireWildcard(require("../controllers/transaction_controller"));

var router = (0, _express.Router)();
router.get('/', [token.checkUserToken], transactionController.getTransactions);
router.get('/:id', [token.checkUserToken], transactionController.getTransactionsByID);
router.get('/byUser/:user_id', [token.checkUserToken], transactionController.getTransactionsByUserID);
router.get('/byFreelancer/:freelancer_id', [token.checkUserToken], transactionController.getTransactionsByFreelancerID);
router.post('/', [token.checkUserToken], transactionController.addNewTransaction);
module.exports = router;