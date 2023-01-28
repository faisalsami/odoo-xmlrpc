import { Client, createClient, createSecureClient } from "xmlrpc";

import {
  AbstractExecuteParams,
  ExecuteKwParams,
  OdooConfig,
  RenderReportParams,
} from "./type";

class Odoo {
  config: OdooConfig;
  host: string;
  port: number;
  db: string;
  username: string;
  password: string;
  secure: boolean;
  uid: number = 0;

  constructor(config: OdooConfig) {
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

  private getClient(path: string): Client {
    const createClientFn = this.secure ? createSecureClient : createClient;

    return createClientFn({
      host: this.host,
      port: this.port,
      path,
    });
  }

  private methodCall(client: Client, method: string, params: any[] = []) {
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

  connect(): Promise<number> {
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

  async execute<T = any>({ client, endpoint, params }: AbstractExecuteParams) {
    try {
      const value = await this.methodCall(client, endpoint, [
        this.db,
        this.uid,
        this.password,
        ...params,
      ]);

      return Promise.resolve(value as T);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async execute_kw<T = any>({
    model,
    method,
    params,
  }: ExecuteKwParams): Promise<T> {
    const client = this.getClient("/xmlrpc/2/object");

    return this.execute<T>({
      client,
      endpoint: "execute_kw",
      params: [model, method, ...params],
    });
  }

  async exec_workflow<T = any>({
    model,
    method,
    params,
  }: ExecuteKwParams): Promise<T> {
    const client = this.getClient("/xmlrpc/2/object");

    return this.execute<T>({
      client,
      endpoint: "exec_workflow",
      params: [model, method, ...params],
    });
  }

  async render_report<T = any>({
    report,
    params,
  }: RenderReportParams): Promise<T> {
    const client = this.getClient("/xmlrpc/2/report");

    return this.execute<T>({
      client,
      endpoint: "render_report",
      params: [report, ...params],
    });
  }
}

export default Odoo;
