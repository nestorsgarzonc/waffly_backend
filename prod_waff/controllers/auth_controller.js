"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.freelancerSignUp = exports.freelancerLogin = exports.userSignUp = exports.userLogin = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _expressValidator = require("express-validator");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _underscore = _interopRequireDefault(require("underscore"));

var _Freelancer = _interopRequireDefault(require("../models/Freelancer"));

var _User = _interopRequireDefault(require("../models/User"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var userLogin = function userLogin(req, res) {
  var errors = (0, _expressValidator.validationResult)(req);

  if (errors.errors.length > 0) {
    return res.status(422).json({
      ok: false,
      message: errors.errors
    });
  }

  _User["default"].findOne({
    email: req.body.email,
    status: true
  }, function (err, user) {
    if (err) {
      return res.status(404).json({
        ok: false,
        message: 'Error ',
        err: err
      });
    }

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado',
        err: err
      });
    }

    if (!_bcrypt["default"].compareSync(req.body.password, user.password)) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario o contraseña incorrecta',
        err: err
      });
    } // TODO: change user propierties in jwt


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

exports.userLogin = userLogin;

var userSignUp = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var props, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            props = _underscore["default"].pick(req.body, 'first_name', 'last_name', 'username', 'email', 'password', 'location', 'document', 'document_type', 'gender', 'img');
            console.log(props);
            props.password = _bcrypt["default"].hashSync(props.password, 10);
            console.log(props);
            user = (0, _User["default"])(props);
            console.log(user);
            user.save(function (err, new_user) {
              if (err) {
                console.log(err);
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              res.json(_objectSpread({
                ok: true,
                message: 'Usuario creado correctamente'
              }, new_user._doc));
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function userSignUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.userSignUp = userSignUp;

var freelancerLogin = function freelancerLogin(req, res) {
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
    }

    if (!freelancer) {
      return res.status(404).json({
        ok: false,
        message: 'Freelancer no encontrado',
        err: err
      });
    }

    if (!_bcrypt["default"].compareSync(req.body.password, freelancer.password)) {
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

exports.freelancerLogin = freelancerLogin;

var freelancerSignUp = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var errors, freelancer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
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
              }, new_freelancer._doc));
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function freelancerSignUp(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.freelancerSignUp = freelancerSignUp;