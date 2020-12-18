"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _expressValidator = require("express-validator");

var serviceController = _interopRequireWildcard(require("../controllers/service_controller"));

var token = _interopRequireWildcard(require("../middleware/auth_token"));

var router = (0, _express.Router)();
router.get('/categories', serviceController.getCategories);
router.get('/byCategory/:category', serviceController.findServicesByCategories);
router.get('/byName/:query', serviceController.findServicesByName);
router.get('/', token.checkToken, serviceController.findAllServices);
router.get('/:id', token.checkToken, serviceController.findServiceById);
router.post('/addService/:id', [token.checkFreelancerToken, (0, _expressValidator.body)('img').isURL().withMessage('Ingresa un link valido')], serviceController.createService);
router.post('/reviews/:id', [token.checkUserToken], serviceController.addReviewToProduct);
router["delete"]('/:id', token.checkFreelancerToken, serviceController.deleteService);
var _default = router;
exports["default"] = _default;