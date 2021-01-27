"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var authController = _interopRequireWildcard(require("../controllers/auth_controller"));

var router = (0, _express.Router)();
router.post('/user/login', [(0, _expressValidator.body)('email').isEmail().withMessage('Ingresa un email valido')], authController.userLogin);
router.post('/user/signup', authController.userSignUp);
router.post('/freelancer/login', [(0, _expressValidator.body)('email').isEmail().withMessage('Ingresa un email valido')], authController.freelancerLogin);
router.post('/freelancer/signup', authController.freelancerSignUp);
var _default = router;
exports["default"] = _default;