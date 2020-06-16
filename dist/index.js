"use strict";

require("@babel/polyfill");

var _xmlrpc = require("xmlrpc");

var _url = _interopRequireDefault(require("url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Odoo = /*#__PURE__*/function () {
  function Odoo() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Odoo);

    this.config = config;

    var urlparts = _url["default"].parse(config.url);

    this.host = urlparts.hostname;
    this.port = config.port || urlparts.port;
    this.db = config.db;
    this.username = config.username;
    this.password = config.password;
    this.secure = true;

    if (urlparts.protocol !== 'https:') {
      this.secure = false;
    }

    this.uid = 0;
  }
  /**
   * Create and returns an xmlrpc client
   * @param {string} path path to use for the connection
   * @returns {Client} xmlrpc client
   */


  _createClass(Odoo, [{
    key: "_getClient",
    value: function _getClient(path) {
      var createClientFn = this.secure ? _xmlrpc.createSecureClient : _xmlrpc.createClient;
      return createClientFn({
        host: this.host,
        port: this.port,
        path: path
      });
    }
  }, {
    key: "_methodCall",
    value: function _methodCall(client, method) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      return new Promise(function (resolve, reject) {
        client.methodCall(method, params, function (err, value) {
          if (err) {
            console.log(err);
            return reject(err);
          }

          return resolve(value);
        });
      });
    }
  }, {
    key: "connect",
    value: function connect(callback) {
      var _this = this;

      var client = this._getClient('/xmlrpc/2/common');

      var params = [];
      params.push(this.db);
      params.push(this.username);
      params.push(this.password);
      params.push({});
      client.methodCall('authenticate', params, function (error, value) {
        if (error) {
          return callback(error, null);
        }

        if (!value) {
          return callback({
            message: "No UID returned from authentication."
          }, null);
        }

        _this.uid = value;
        return callback(null, value);
      });
    }
  }, {
    key: "execute_kw",
    value: function () {
      var _execute_kw = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(model, method, params, callback) {
        var client, fparams, i, value;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                client = this._getClient('/xmlrpc/2/object');
                fparams = [];
                fparams.push(this.db);
                fparams.push(this.uid);
                fparams.push(this.password);
                fparams.push(model);
                fparams.push(method);

                for (i = 0; i < params.length; i++) {
                  fparams.push(params[i]);
                }

                _context.prev = 8;
                _context.next = 11;
                return this._methodCall(client, 'execute_kw', fparams);

              case 11:
                value = _context.sent;
                return _context.abrupt("return", callback(null, value));

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](8);
                return _context.abrupt("return", callback(_context.t0, null));

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 15]]);
      }));

      function execute_kw(_x, _x2, _x3, _x4) {
        return _execute_kw.apply(this, arguments);
      }

      return execute_kw;
    }()
  }, {
    key: "exec_workflow",
    value: function () {
      var _exec_workflow = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(model, method, params, callback) {
        var client, fparams, i, value;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                client = this._getClient('/xmlrpc/2/object');
                fparams = [];
                fparams.push(this.db);
                fparams.push(this.uid);
                fparams.push(this.password);
                fparams.push(model);
                fparams.push(method);

                for (i = 0; i < params.length; i++) {
                  fparams.push(params[i]);
                }

                _context2.prev = 8;
                _context2.next = 11;
                return this._methodCall(client, 'exec_workflow', fparams);

              case 11:
                value = _context2.sent;
                return _context2.abrupt("return", callback(null, value));

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](8);
                return _context2.abrupt("return", callback(_context2.t0, null));

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[8, 15]]);
      }));

      function exec_workflow(_x5, _x6, _x7, _x8) {
        return _exec_workflow.apply(this, arguments);
      }

      return exec_workflow;
    }()
  }, {
    key: "render_report",
    value: function () {
      var _render_report = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(report, params, callback) {
        var client, fparams, i, value;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                client = this._getClient('/xmlrpc/2/report');
                fparams = [];
                fparams.push(this.db);
                fparams.push(this.uid);
                fparams.push(this.password);
                fparams.push(report);

                for (i = 0; i < params.length; i++) {
                  fparams.push(params[i]);
                }

                _context3.prev = 7;
                _context3.next = 10;
                return this._methodCall(client, 'render_report', fparams);

              case 10:
                value = _context3.sent;
                return _context3.abrupt("return", callback(null, value));

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](7);
                return _context3.abrupt("return", callback(_context3.t0, null));

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[7, 14]]);
      }));

      function render_report(_x9, _x10, _x11) {
        return _render_report.apply(this, arguments);
      }

      return render_report;
    }()
  }]);

  return Odoo;
}();

module.exports = Odoo;