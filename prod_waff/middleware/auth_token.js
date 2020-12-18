"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports.checkToken = function (req, res, next) {
  var token = req.get('token');

  _jsonwebtoken["default"].verify(token, process.env.SEED, function (err, _) {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: 'Token no valido',
        err: err
      });
    }

    next();
  });
};

exports.checkUserToken = function (req, res, next) {
  var token = req.get('token');

  _jsonwebtoken["default"].verify(token, process.env.SEED, function (err, decoded) {
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
    next();
  });
};

exports.checkFreelancerToken = function (req, res, next) {
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
    next();
  });
};