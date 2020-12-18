"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFreelancer = exports.updateFreelancer = exports.findFreelancerById = exports.findAllFreelancers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Freelancer = _interopRequireDefault(require("../models/Freelancer"));

var _underscore = _interopRequireDefault(require("underscore"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var findAllFreelancers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(__, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _Freelancer["default"].find().populate('services').exec(function (err, freelancers) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              res.json(_objectSpread({
                ok: true
              }, freelancers));
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findAllFreelancers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllFreelancers = findAllFreelancers;

var findFreelancerById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _Freelancer["default"].findById(req.params.id).populate('services').exec(function (err, freelancer) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              res.json(_objectSpread({
                ok: true
              }, freelancer['_doc']));
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findFreelancerById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findFreelancerById = findFreelancerById;

var updateFreelancer = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var body;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = _underscore["default"].pick(req.body, ['first_name', 'last_name', 'username', 'location', 'document', 'services', 'gender', 'email', 'img']);

            _Freelancer["default"].findByIdAndUpdate(req.params.id, body, function (err, __) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  err: err
                });
              }

              res.json({
                ok: true,
                message: 'Freelancer actualizado correctamente'
              });
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateFreelancer(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.updateFreelancer = updateFreelancer;

var deleteFreelancer = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _Freelancer["default"].findByIdAndUpdate(req.params.id, {
              status: false
            }, function (err, __) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              res.json({
                ok: true,
                message: 'Freelancer eliminado exitosamente'
              });
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteFreelancer(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteFreelancer = deleteFreelancer;