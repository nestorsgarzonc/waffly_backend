"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

var freelancerSchema = new _mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  document: {
    type: Number,
    unique: true,
    required: [true, "El documento es requerido"]
  },
  services: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  gender: {
    type: String,
    "default": ''
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  img: {
    type: String,
    required: [true, 'La imagen es requerida']
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    "default": true
  },
  type: {
    type: String,
    "default": 'freelancer'
  }
}, {
  versionKey: false,
  timestamps: true
});

freelancerSchema.methods.toJSON = function () {
  var freelancer = this;
  var freelancerObject = freelancer.toObject();
  delete freelancerObject.password;
  return freelancerObject;
};

freelancerSchema.plugin(_mongooseUniqueValidator["default"], {
  message: '{PATH} debe ser unico'
});

var _default = (0, _mongoose.model)('Freelancer', freelancerSchema);

exports["default"] = _default;