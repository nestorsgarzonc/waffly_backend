"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)(); //= =====================
// Port
//= =====================

process.env.PORT = process.env.PORT || 3000; //= =====================
// Entorno
//= =====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //= =====================
// Vencimiento token
//= =====================

process.env.CADUCIDAD_TOKEN = '1000h'; //= =====================
// Seed autenticacion
//= =====================

process.env.SEED = process.env.SEED || 'dev_secret_seed'; //= =====================
// DB
//= =====================

var urlDB;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost/waffly_test';
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
var _default = {
  mongodbURL: urlDB
};
exports["default"] = _default;