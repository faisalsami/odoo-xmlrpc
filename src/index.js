/*
*
* Author: Faisal Sami
* mail: faisalsami78@gmail.com
* https://github.com/faisalsami/odoo-xmlrpc
*
*
*/
import '@babel/polyfill';
import {
  createClient,
  createSecureClient,
} from 'xmlrpc';
import { URL } from 'url';

class Odoo {
  constructor(config = {}) {
    this.config = config; const urlparts = new URL(config.url);
    this.host = urlparts.hostname;
    this.port = config.port || urlparts.port;
    this.db = config.db;
    this.username = config.username;
    this.password = config.password;
    this.secure = true;
    if (urlparts.protocol !== 'https:') {
      this.secure = false
    }
    this.uid = 0;
  }

  /**
   * Create and returns an xmlrpc client
   * @param {string} path path to use for the connection
   * @returns {Client} xmlrpc client
   */
  _getClient(path) {
    const createClientFn = this.secure ? createSecureClient : createClient;
    return createClientFn({
      host: this.host,
      port: this.port,
      path,
    });
  }

  _methodCall(client, method, params = []) {
    return new Promise((resolve, reject) => {
      client.methodCall(method, params, (err, value) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        return resolve(value);
      });
    });
  }

  connect(callback) {
    var client = this._getClient('/xmlrpc/2/common');
    var params = [];
    params.push(this.db);
    params.push(this.username);
    params.push(this.password);
    params.push({});
    client.methodCall('authenticate', params, (error, value) => {
      if (error) {
        return callback(error, null)
      }
      if (!value) {
        return callback({ message: "No UID returned from authentication." }, null)
      }
      this.uid = value;
      return callback(null, value)
    });
  }

  async execute_kw(model, method, params, callback) {
    var client = this._getClient('/xmlrpc/2/object');
    var fparams = [];
    fparams.push(this.db);
    fparams.push(this.uid);
    fparams.push(this.password);
    fparams.push(model);
    fparams.push(method);
    for (var i = 0; i < params.length; i++) {
      fparams.push(params[i]);
    }
    try {
      const value = await this._methodCall(client, 'execute_kw', fparams);
      return callback(null, value);
    } catch (error) {
      return callback(error, null);
    }
  }

  async exec_workflow(model, method, params, callback) {
    var client = this._getClient('/xmlrpc/2/object');
    var fparams = [];
    fparams.push(this.db);
    fparams.push(this.uid);
    fparams.push(this.password);
    fparams.push(model);
    fparams.push(method);
    for (var i = 0; i < params.length; i++) {
      fparams.push(params[i]);
    }
    try {
      const value = await this._methodCall(client, 'exec_workflow', fparams);
      return callback(null, value);
    } catch (error) {
      return callback(error, null);
    }
  }

  async render_report(report, params, callback) {
    var client = this._getClient('/xmlrpc/2/report');
    var fparams = [];
    fparams.push(this.db);
    fparams.push(this.uid);
    fparams.push(this.password);
    fparams.push(report);
    for (var i = 0; i < params.length; i++) {
      fparams.push(params[i]);
    }
    try {
      const value = await this._methodCall(client, 'render_report', fparams);
      return callback(null, value);
    } catch (error) {
      return callback(error, null);
    }
  }
}

module.exports = Odoo;
