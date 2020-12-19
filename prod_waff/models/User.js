"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

var userSchema = new _mongoose.Schema({
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
    unique: true,
    required: [true, 'El nombre de usuario es necesario']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El correo es necesario']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida']
  },
  location: {
    type: String,
    "default": ''
  },
  document: {
    type: Number,
    unique: true,
    required: [false, 'El documento es obligatorio']
  },
  gender: {
    type: String,
    "default": 'no seleccionado'
  },
  img: {
    type: String,
    required: false
  },
  status: {
    type: Boolean,
    "default": true
  },
  services_history: [{
    freelancer_id: {
      type: _mongoose.Schema.Types.ObjectId
    },
    service_id: {
      type: _mongoose.Schema.Types.ObjectId
    },
    date: {
      type: Date,
      "default": new Date()
    }
  }],
  type: {
    type: String,
    "default": 'user'
  }
}, {
  versionKey: false,
  timestamps: true
});

userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.plugin(_mongooseUniqueValidator["default"], {
  message: '{PATH} debe ser unico'
});

var _default = (0, _mongoose.model)('User', userSchema);

exports["default"] = _default;