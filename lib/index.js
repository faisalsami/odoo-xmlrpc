var xmlrpc = require('xmlrpc');

var Odoo = function (config) {
    config = config || {};

    this.url = config.url;
    this.port = config.port || 80;
    this.db = config.db;
    this.username = config.username;
    this.password = config.password;
    var uid = 0;
    this.connect = function(callback){
        var clientOptions = {
            host: this.url
            , port: this.port
            , path: '/xmlrpc/2/common'
        }
        var client = xmlrpc.createClient(clientOptions);
        var params = [];
        params.push(this.db);
        params.push(this.username);
        params.push(this.password);
        params.push('');
        client.methodCall('authenticate', params, function(error, value) {
            if(error){
                return callback(error, null);
            }
            uid = value;
            return callback(null);
        });
    };
    this.execute_kw = function(model, method, params, callback){
        var clientOptions = {
            host: this.url
            , port: this.port
            , path: '/xmlrpc/2/object'
        }
        var client = xmlrpc.createClient(clientOptions);
        var fparams = [];
        fparams.push(this.db);
        fparams.push(uid);
        fparams.push(this.password);
        fparams.push(model);
        fparams.push(method);
        for(var i = 0; i <params.length; i++){
            fparams.push(params[i]);
        }
        client.methodCall('execute_kw', fparams, function(error, value) {
            if(error){
                return callback(error, null);
            }
            return callback(null,value);
        });
    };
    this.exec_workflow = function(model, method, params, callback){
        var clientOptions = {
            host: this.url
            , port: this.port
            , path: '/xmlrpc/2/object'
        }
        var client = xmlrpc.createClient(clientOptions);
        var fparams = [];
        fparams.push(this.db);
        fparams.push(uid);
        fparams.push(this.password);
        fparams.push(model);
        fparams.push(method);
        for(var i = 0; i <params.length; i++){
            fparams.push(params[i]);
        }
        client.methodCall('exec_workflow', fparams, function(error, value) {
            if(error){
                return callback(error, null);
            }
            return callback(null,value);
        });
    };
    this.render_report = function(report, params, callback){
        var clientOptions = {
            host: this.url
            , port: this.port
            , path: '/xmlrpc/2/report'
        }
        var client = xmlrpc.createClient(clientOptions);
        var fparams = [];
        fparams.push(this.db);
        fparams.push(uid);
        fparams.push(this.password);
        fparams.push(report);
        for(var i = 0; i <params.length; i++){
            fparams.push(params[i]);
        }
        client.methodCall('render_report', fparams, function(error, value) {
            if(error){
                return callback(error, null);
            }
            return callback(null,value);
        });
    };
};

module.exports = Odoo;