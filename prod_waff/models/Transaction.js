"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var transactionStatus = {
  values: ['Pendiente', 'Rechazada', 'Aceptada'],
  message: '{VALUES} no es una categoria valida'
};
var serviceSchema = new _mongoose.Schema({
  service_id: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'El id del servicio es obligatorio']
  },
  user_id: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El id del usuario es obligatorio']
  },
  freelancer_id: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Freelancer',
    required: [true, 'El id del freelancer es obligatorio']
  },
  transaction_status: {
    type: String,
    "default": 'Pendiente',
    "enum": transactionStatus
  }
}, {
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)('Transaction', serviceSchema);

exports["default"] = _default;