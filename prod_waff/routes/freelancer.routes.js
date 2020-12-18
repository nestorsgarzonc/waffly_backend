"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var freelancerController = _interopRequireWildcard(require("../controllers/freelancer_controller"));

var token = _interopRequireWildcard(require("../middleware/auth_token"));

var router = (0, _express.Router)();
router.get('/', freelancerController.findAllFreelancers);
router.get('/:id', freelancerController.findFreelancerById);
router.put('/:id', [token.checkFreelancerToken], freelancerController.updateFreelancer);
router["delete"]('/:id', [token.checkFreelancerToken], freelancerController.deleteFreelancer);
var _default = router;
exports["default"] = _default;