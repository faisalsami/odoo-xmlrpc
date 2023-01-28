import { Client } from 'xmlrpc';

type OdooConfig = {
    url: string;
    port?: number;
    db: string;
    username: string;
    password: string;
    secure?: boolean;
};
type ExecuteKwParams = {
    model: string;
    method: string;
    params: any[];
};
type AbstractExecuteParams = {
    endpoint: string;
    client: Client;
    params: any[];
};
type RenderReportParams = {
    report: string;
    params: any[];
};

declare class Odoo {
    config: OdooConfig;
    host: string;
    port: number;
    db: string;
    username: string;
    password: string;
    secure: boolean;
    uid: number;
    constructor(config: OdooConfig);
    private getClient;
    private methodCall;
    connect(): Promise<number>;
    execute<T = any>({ client, endpoint, params }: AbstractExecuteParams): Promise<T>;
    execute_kw<T = any>({ model, method, params, }: ExecuteKwParams): Promise<T>;
    exec_workflow<T = any>({ model, method, params, }: ExecuteKwParams): Promise<T>;
    render_report<T = any>({ report, params, }: RenderReportParams): Promise<T>;
}

export { Odoo as default };
