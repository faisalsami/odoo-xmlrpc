import { Client } from "xmlrpc";

export type OdooConfig = {
  url: string;
  port?: number;
  db: string;
  username: string;
  password: string;
  secure?: boolean;
};

export type ExecuteKwParams = {
  model: string;
  method: string;
  params: any[];
};

export type AbstractExecuteParams = {
  endpoint: string;
  client: Client;
  params: any[];
};

export type RenderReportParams = {
  report: string;
  params: any[];
};
