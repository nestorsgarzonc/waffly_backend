"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteUser = exports.updateUser = exports.addToServiceHistory = exports.findUserById = exports.findAllUsers = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("../models/User"));

var _Service = require("../models/Service");

var _underscore = _interopRequireDefault(require("underscore"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var findAllUsers = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(__, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _User["default"].find().exec(function (err, users) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              res.json(_objectSpread({
                ok: true
              }, users));
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findAllUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllUsers = findAllUsers;

var findUserById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _User["default"].findById(req.params.id).exec(function (err, user) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              res.json(_objectSpread({
                ok: true
              }, user['_doc']));
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findUserById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findUserById = findUserById;

var addToServiceHistory = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var serviceObj;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            serviceObj = {
              freelancer_id: req.body.freelancer_id,
              service_id: req.body.service_id,
              date: new Date()
            };

            _User["default"].findByIdAndUpdate(req.params.id, {
              $push: {
                services_history: serviceObj
              }
            }, function (err, __) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              _Service.Service.findByIdAndUpdate(serviceObj.service_id, {
                $inc: {
                  num_purchases: 1
                }
              }, function (err_2, ___) {
                if (err_2) {
                  return res.status(400).json({
                    ok: false,
                    message: err_2
                  });
                }

                res.json({
                  ok: true,
                  message: 'Agregado correctamente'
                });
              });
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addToServiceHistory(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addToServiceHistory = addToServiceHistory;

var updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var body;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            body = _underscore["default"].pick(req.body, ['first_name', 'last_name', 'email', 'img', 'status', 'location', 'gender', 'username']);

            _User["default"].findByIdAndUpdate(req.params.id, body, function (err, __) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              res.json({
                ok: true,
                message: 'Usuario actualizado correctamente'
              });
            });

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _User["default"].findByIdAndUpdate(req.params.id, {
              status: false
            }, function (err, __) {
              if (err) {
                return res.status(404).json({
                  ok: false,
                  message: err
                });
              }

              res.json({
                ok: true,
                message: 'Usuario eliminado correctamente'
              });
            });

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deleteUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;