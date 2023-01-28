// src/index.ts
import { createClient, createSecureClient } from "xmlrpc";
var Odoo = class {
  constructor(config) {
    this.uid = 0;
    this.config = config;
    const { hostname, port, protocol } = new URL(config.url);
    this.host = hostname;
    this.port = config.port || Number(port);
    this.db = config.db;
    this.username = config.username;
    this.password = config.password;
    this.secure = true;
    if (protocol !== "https:") {
      this.secure = false;
    }
    this.uid = 0;
  }
  getClient(path) {
    const createClientFn = this.secure ? createSecureClient : createClient;
    return createClientFn({
      host: this.host,
      port: this.port,
      path
    });
  }
  methodCall(client, method, params = []) {
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
  connect() {
    const client = this.getClient("/xmlrpc/2/common");
    return new Promise((resolve, reject) => {
      client.methodCall(
        "authenticate",
        [this.db, this.username, this.password, {}],
        (error, value) => {
          if (error) {
            return reject(error);
          }
          if (!value) {
            return reject(new Error("No UID returned from authentication."));
          }
          this.uid = value;
          return resolve(this.uid);
        }
      );
    });
  }
  async execute({ client, endpoint, params }) {
    try {
      const value = await this.methodCall(client, endpoint, [
        this.db,
        this.uid,
        this.password,
        ...params
      ]);
      return Promise.resolve(value);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async execute_kw({
    model,
    method,
    params
  }) {
    const client = this.getClient("/xmlrpc/2/object");
    return this.execute({
      client,
      endpoint: "execute_kw",
      params: [model, method, ...params]
    });
  }
  async exec_workflow({
    model,
    method,
    params
  }) {
    const client = this.getClient("/xmlrpc/2/object");
    return this.execute({
      client,
      endpoint: "exec_workflow",
      params: [model, method, ...params]
    });
  }
  async render_report({
    report,
    params
  }) {
    const client = this.getClient("/xmlrpc/2/report");
    return this.execute({
      client,
      endpoint: "render_report",
      params: [report, ...params]
    });
  }
};
var src_default = Odoo;
export {
  src_default as default
};
//# sourceMappingURL=index.mjs.map