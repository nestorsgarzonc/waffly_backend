"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addReviewToProduct = exports.deleteService = exports.createService = exports.getCategories = exports.findServicesByName = exports.findServicesByCategories = exports.findServiceById = exports.findAllServices = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Freelancer = _interopRequireDefault(require("../models/Freelancer"));

var _Service = require("../models/Service");

var _expressValidator = require("express-validator");

var findAllServices = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, res) {
    var services;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Service.Service.find();

          case 2:
            services = _context.sent;
            res.json({
              ok: true,
              services: services
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findAllServices(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.findAllServices = findAllServices;

var findServiceById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var services;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _Service.Service.findById(req.params.id);

          case 2:
            services = _context2.sent;
            res.json({
              ok: true,
              services: services
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findServiceById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findServiceById = findServiceById;

var findServicesByCategories = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var services;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Service.Service.find({
              category: req.params.category
            });

          case 2:
            services = _context3.sent;
            res.json({
              ok: true,
              services: services
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findServicesByCategories(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findServicesByCategories = findServicesByCategories;

var findServicesByName = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var regex, services;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            regex = new RegExp(req.params.query, 'i');
            _context4.next = 3;
            return _Service.Service.find({
              title: regex
            });

          case 3:
            services = _context4.sent;
            res.json({
              ok: true,
              services: services
            });

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findServicesByName(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.findServicesByName = findServicesByName;

var getCategories = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_, res) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            res.json({
              categories: _Service.categories.values
            });

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getCategories(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getCategories = getCategories;

var createService = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var errors, service;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (!(errors.errors.length > 0)) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", res.status(422).json({
              ok: false,
              message: errors.errors
            }));

          case 3:
            service = (0, _Service.Service)({
              title: req.body.title,
              category: req.body.category,
              is_presencial: req.body.is_presencial,
              description: req.body.description,
              price: req.body.price,
              img: req.body.img,
              freelancer_id: req.params.id
            });
            service.save(function (err, service_saved) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              _Freelancer["default"].findByIdAndUpdate(req.params.id, {
                $push: {
                  services: service_saved._id
                }
              }, function (err_f, __) {
                if (err_f) {
                  return res.status(400).json({
                    ok: false,
                    message: err_f
                  });
                }

                res.json({
                  ok: true,
                  message: 'Servicio agregado correctamente'
                });
              });
            });

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function createService(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createService = createService;

var deleteService = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _Service.Service.findByIdAndUpdate(req.params.id, {
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
                message: 'Servicio eliminado correctamente'
              });
            });

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function deleteService(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.deleteService = deleteService;

var addReviewToProduct = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var errors, serviceObj;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            errors = (0, _expressValidator.validationResult)(req);

            if (!(errors.errors.length > 0)) {
              _context8.next = 3;
              break;
            }

            return _context8.abrupt("return", res.status(422).json({
              ok: false,
              message: errors.errors
            }));

          case 3:
            serviceObj = {
              stars: req.body.stars,
              review: req.body.review,
              user_id: req.body.user_id
            };

            _Service.Service.findByIdAndUpdate(req.params.id, {
              $push: {
                reviews: serviceObj
              }
            }, function (err, __) {
              if (err) {
                return res.status(400).json({
                  ok: false,
                  message: err
                });
              }

              res.json({
                ok: true,
                message: 'Calificacion añadida correctamente'
              });
            });

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function addReviewToProduct(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.addReviewToProduct = addReviewToProduct;