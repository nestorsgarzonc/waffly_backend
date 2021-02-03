"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _Service = require("../models/Service");

var _Transaction = _interopRequireDefault(require("../models/Transaction"));

var getTransactions = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_) {
    var res,
        transactions,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res = _args.length > 1 && _args[1] !== undefined ? _args[1] : _express.response;
            _context.prev = 1;
            _context.next = 4;
            return _Transaction["default"].find().populate('service_id');

          case 4:
            transactions = _context.sent;
            res.json({
              ok: true,
              transactions: transactions
            });
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);
            res.status(500).json({
              ok: false,
              message: 'Ha ocurrido un error'
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function getTransactions(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getTransactionsByID = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var res,
        id,
        transaction,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : _express.response;
            id = req.params.id;

            if (!id) {
              res.status(400).json({
                ok: false,
                message: 'El id es necesario'
              });
            }

            _context2.prev = 3;
            _context2.next = 6;
            return _Transaction["default"].findById(req.params.id).populate('service_id');

          case 6:
            transaction = _context2.sent;
            res.json({
              ok: true,
              transaction: transaction
            });
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](3);
            console.log(_context2.t0);
            res.status(500).json({
              ok: false,
              message: 'Ha ocurrido un error'
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 10]]);
  }));

  return function getTransactionsByID(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getTransactionsByUserID = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req) {
    var res,
        user_id,
        transactions,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            res = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : _express.response;
            user_id = req.params.user_id;

            if (!user_id) {
              res.status(400).json({
                ok: false,
                message: 'El user id es obligatorio'
              });
            }

            _context3.prev = 3;
            _context3.next = 6;
            return _Transaction["default"].find({
              user_id: user_id
            }).populate('service_id freelancer_id');

          case 6:
            transactions = _context3.sent;
            res.json({
              ok: true,
              transactions: transactions
            });
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](3);
            console.log(_context3.t0);
            res.status(500).json({
              ok: false,
              message: 'Ha ocurrido un error'
            });

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 10]]);
  }));

  return function getTransactionsByUserID(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getTransactionsByFreelancerID = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
    var res,
        freelancer_id,
        transactions,
        _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            res = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : _express.response;
            freelancer_id = req.params.freelancer_id;

            if (!freelancer_id) {
              res.status(400).json({
                ok: false,
                message: 'El freelancer_id es obligatorio'
              });
            }

            _context4.prev = 3;
            _context4.next = 6;
            return _Transaction["default"].find({
              freelancer_id: freelancer_id
            }).populate('service_id user_id');

          case 6:
            transactions = _context4.sent;
            res.json({
              ok: true,
              transactions: transactions
            });
            _context4.next = 14;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](3);
            console.log(_context4.t0);
            res.status(500).json({
              ok: false,
              message: 'Ha ocurrido un error'
            });

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 10]]);
  }));

  return function getTransactionsByFreelancerID(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var addNewTransaction = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req) {
    var res,
        _req$body,
        service_id,
        user_id,
        transaction_status,
        _yield$Service$findBy,
        freelancer_id,
        transaction,
        _args5 = arguments;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            res = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : _express.response;
            _req$body = req.body, service_id = _req$body.service_id, user_id = _req$body.user_id, transaction_status = _req$body.transaction_status;
            _context5.prev = 2;
            _context5.next = 5;
            return _Service.Service.findById(service_id);

          case 5:
            _yield$Service$findBy = _context5.sent;
            freelancer_id = _yield$Service$findBy.freelancer_id;
            transaction = (0, _Transaction["default"])({
              service_id: service_id,
              user_id: user_id,
              transaction_status: transaction_status,
              freelancer_id: freelancer_id
            });
            _context5.next = 10;
            return transaction.save();

          case 10:
            res.json({
              ok: true,
              transaction: transaction
            });
            _context5.next = 17;
            break;

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](2);
            console.log(_context5.t0);
            res.status(500).json({
              ok: false,
              message: 'Ha ocurrido un error'
            });

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 13]]);
  }));

  return function addNewTransaction(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

module.exports = {
  getTransactions: getTransactions,
  getTransactionsByID: getTransactionsByID,
  getTransactionsByUserID: getTransactionsByUserID,
  getTransactionsByFreelancerID: getTransactionsByFreelancerID,
  addNewTransaction: addNewTransaction
};