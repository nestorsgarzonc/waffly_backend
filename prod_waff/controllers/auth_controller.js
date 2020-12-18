"use strict";

var _User = _interopRequireDefault(require("../models/User"));

var _Freelancer = _interopRequireDefault(require("../models/Freelancer"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _expressValidator = require("express-validator");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

exports.userLogin = function (req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (errors.errors.length > 0) {
    return res.status(422).json({
      ok: false,
      message: errors.errors
    });
  }

  _User["default"].findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      return res.status(404).json({
        ok: false,
        message: 'Error ',
        err: err
      });
    } else if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado',
        err: err
      });
    } else if (!_bcrypt["default"].compareSync(req.body.password, user.password)) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario o contraseña incorrecta',
        err: err
      });
    }

    var token = _jsonwebtoken["default"].sign({
      user: user
    }, process.env.SEED, {
      expiresIn: process.env.CADUCIDAD_TOKEN
    });

    res.json({
      ok: true,
      user: user,
      token: token
    });
  });
};

exports.userSignUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var errors, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (!(errors.errors.length > 0)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(422).json({
              ok: false,
              message: errors.errors
            }));

          case 3:
            user = (0, _User["default"])({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              email: req.body.email,
              password: _bcrypt["default"].hashSync(req.body.password, 10),
              location: req.body.location,
              document: req.body.document,
              gender: req.body.gender,
              img: req.body.img
            });
            user.save(function (err, new_user) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              res.json(_objectSpread({
                ok: true,
                message: 'Usuario creado correctamente'
              }, new_user['_doc']));
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.freelancerLogin = function (req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (errors.errors.length > 0) {
    return res.status(422).json({
      ok: false,
      message: errors.errors
    });
  }

  _Freelancer["default"].findOne({
    email: req.body.email
  }, function (err, freelancer) {
    if (err) {
      return res.status(404).json({
        ok: false,
        message: 'Error ',
        err: err
      });
    } else if (!freelancer) {
      return res.status(404).json({
        ok: false,
        message: 'Freelancer no encontrado',
        err: err
      });
    } else if (!_bcrypt["default"].compareSync(req.body.password, freelancer.password)) {
      return res.status(404).json({
        ok: false,
        message: 'Freelancer o contraseña incorrecta',
        err: err
      });
    }

    var token = _jsonwebtoken["default"].sign({
      freelancer: freelancer
    }, process.env.SEED, {
      expiresIn: process.env.CADUCIDAD_TOKEN
    });

    res.json({
      ok: true,
      freelancer: freelancer,
      token: token
    });
  });
};

exports.freelancerSignUp = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var errors, freelancer;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (!(errors.errors.length > 0)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(422).json({
              ok: false,
              message: errors.errors
            }));

          case 3:
            freelancer = (0, _Freelancer["default"])({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              location: req.body.location,
              document: req.body.document,
              gender: req.body.gender,
              email: req.body.email,
              img: req.body.img,
              password: _bcrypt["default"].hashSync(req.body.password, 10)
            });
            freelancer.save(function (err, new_freelancer) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              res.json(_objectSpread({
                ok: true,
                message: 'Freelancer creado correctamente'
              }, new_freelancer['_doc']));
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();