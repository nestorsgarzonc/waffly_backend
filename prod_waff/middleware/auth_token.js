"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkFreelancerToken = exports.checkUserToken = exports.checkToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var checkToken = function checkToken(req, res, next) {
  var token = req.get('token'); // eslint-disable-next-line no-unused-vars

  _jsonwebtoken["default"].verify(token, process.env.SEED, function (err, _) {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Token no valido',
        err: err
      });
    }

    return next();
  });
};

exports.checkToken = checkToken;

var checkUserToken = function checkUserToken(req, res, next) {
  var token = req.get('token');

  _jsonwebtoken["default"].verify(token, process.env.SEED, function (err, decoded) {
    console.log(decoded);

    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Token no valido',
        err: err
      });
    }

    if (!decoded.user) {
      return res.status(400).json({
        ok: false,
        message: 'Permisos no validos',
        err: err
      });
    }

    req.usuario = decoded.user;
    return next();
  });
};

exports.checkUserToken = checkUserToken;

var checkFreelancerToken = function checkFreelancerToken(req, res, next) {
  var token = req.get('token');

  _jsonwebtoken["default"].verify(token, process.env.SEED, function (err, decoded) {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Token no valido',
        err: err
      });
    }

    if (!decoded.freelancer) {
      return res.status(400).json({
        ok: false,
        message: 'Permisos no validos',
        err: err
      });
    }

    req.freelancer = decoded.freelancer;
    return next();
  });
};

exports.checkFreelancerToken = checkFreelancerToken;