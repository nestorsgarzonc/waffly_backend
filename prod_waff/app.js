"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _service = _interopRequireDefault(require("./routes/service.routes"));

var _user = _interopRequireDefault(require("./routes/user.routes"));

var _freelancer = _interopRequireDefault(require("./routes/freelancer.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.disable('x-powered-by');
app.set('port', process.env.PORT || 8080);
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use('/api/service', _service["default"]);
app.use('/api/user', _user["default"]);
app.use('/api/freelancer', _freelancer["default"]);
app.use('/api/auth', _auth["default"]);
var _default = app;
exports["default"] = _default;