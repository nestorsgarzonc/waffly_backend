"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var userController = _interopRequireWildcard(require("../controllers/user_controller"));

var token = _interopRequireWildcard(require("../middleware/auth_token"));

var router = (0, _express.Router)();
router.get('/', userController.findAllUsers);
router.get('/:id', userController.findUserById);
router.put('/:id', [token.checkUserToken], userController.updateUser);
router.put('/addService/:id', [token.checkUserToken], userController.addToServiceHistory);
router["delete"]('/:id', [token.checkUserToken], userController.deleteUser);
var _default = router;
exports["default"] = _default;