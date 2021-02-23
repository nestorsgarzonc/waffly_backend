"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.freelancerSignUp = exports.freelancerLogin = exports.userSignUp = exports.userLogin = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _expressValidator = require("express-validator");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _underscore = _interopRequireDefault(require("underscore"));

var _Freelancer = _interopRequireDefault(require("../models/Freelancer"));

var _User = _interopRequireDefault(require("../models/User"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var userLogin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var errors, user, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            errors = (0, _expressValidator.validationResult)(req);

            if (!(errors.errors.length > 0)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.status(422).json({
              ok: false,
              message: errors.errors
            }));

          case 4:
            _context.next = 6;
            return _User["default"].findOne({
              email: req.body.email,
              status: true
            });

          case 6:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Usuario no encontrado',
              err: err
            }));

          case 9:
            if (_bcrypt["default"].compareSync(req.body.password, user.password)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Usuario o contraseña incorrecta',
              err: err
            }));

          case 11:
            token = _jsonwebtoken["default"].sign({
              id: user._id,
              type: user.type
            }, process.env.SEED, {
              expiresIn: process.env.CADUCIDAD_TOKEN
            });
            return _context.abrupt("return", res.json({
              ok: true,
              user: user,
              token: token
            }));

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Error ',
              err: _context.t0
            }));

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function userLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.userLogin = userLogin;

var userSignUp = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var props, user, new_user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            props = _underscore["default"].pick(req.body, 'first_name', 'last_name', 'username', 'email', 'password', 'location', 'document', 'document_type', 'gender', 'img');
            props.password = _bcrypt["default"].hashSync(props.password, 10);
            _context2.prev = 2;
            user = (0, _User["default"])(props);
            _context2.next = 6;
            return user.save();

          case 6:
            new_user = _context2.sent;
            return _context2.abrupt("return", res.json(_objectSpread({
              ok: true,
              message: 'Usuario creado correctamente'
            }, new_user._doc)));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", res.status(400).json({
              ok: false,
              message: _context2.t0
            }));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));

  return function userSignUp(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.userSignUp = userSignUp;

var freelancerLogin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var errors, freelancer, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (!(errors.errors.length > 0)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(422).json({
              ok: false,
              message: errors.errors
            }));

          case 3:
            _context3.prev = 3;
            _context3.next = 6;
            return _Freelancer["default"].findOne({
              email: req.body.email
            });

          case 6:
            freelancer = _context3.sent;

            if (freelancer) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Freelancer no encontrado',
              err: err
            }));

          case 9:
            if (_bcrypt["default"].compareSync(req.body.password, freelancer.password)) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Freelancer o contraseña incorrecta',
              err: err
            }));

          case 11:
            token = _jsonwebtoken["default"].sign({
              id: freelancer._id,
              type: freelancer.type
            }, process.env.SEED, {
              expiresIn: process.env.CADUCIDAD_TOKEN
            });
            return _context3.abrupt("return", res.json({
              ok: true,
              freelancer: freelancer,
              token: token
            }));

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](3);
            return _context3.abrupt("return", res.status(404).json({
              ok: false,
              message: 'Error ',
              err: _context3.t0
            }));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 15]]);
  }));

  return function freelancerLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.freelancerLogin = freelancerLogin;

var freelancerSignUp = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var errors, freelancer, new_freelancer;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (!(errors.errors.length > 0)) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(422).json({
              ok: false,
              message: errors.errors
            }));

          case 3:
            _context4.prev = 3;
            freelancer = (0, _Freelancer["default"])({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              username: req.body.username,
              location: req.body.location,
              document: req.body.document,
              gender: req.body.gender,
              email: req.body.email,
              phone: req.body.phone,
              img: req.body.img,
              password: _bcrypt["default"].hashSync(req.body.password, 10)
            });
            _context4.next = 7;
            return freelancer.save();

          case 7:
            new_freelancer = _context4.sent;
            res.json(_objectSpread({
              ok: true,
              message: 'Freelancer creado correctamente'
            }, new_freelancer._doc));
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](3);
            return _context4.abrupt("return", res.status(400).json({
              ok: false,
              message: _context4.t0
            }));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 11]]);
  }));

  return function freelancerSignUp(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.freelancerSignUp = freelancerSignUp;