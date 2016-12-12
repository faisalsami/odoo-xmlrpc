# odoo-xmlrpc

Node.js client library for [odoo](https://www.odoo.com/) ERP using xmlrpc.

## Node version
Works better with NodeJS v11.16 and further

## Installation

```sh
$ npm install odoo-xmlrpc
```

## Methods

### odoo.connect(callback)
### odoo.execute_kw(model,method,params,callback)
### odoo.exec_workflow(model,method,params,callback)
### odoo.render_report(report,params,callback)

## Usage

```js
var Odoo = require('odoo-xmlrpc');
```

### Configuration

```js
var odoo = new Odoo({
    url: <insert server URL>,
    port: <insert server Port (by default 80)>,
    db: <insert database name>,
    username: '<insert username>',
    password: '<insert password>'
});
```

### Logging in

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');    
});
```

### Calling methods

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push('read');
    inParams.push(false); //raise_exception
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'check_access_rights', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
});
```

### List Records

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([['is_company', '=', true],['customer', '=', true]]);
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'search', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
});
```

### Pagination

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([['is_company', '=', true],['customer', '=', true]]);
    inParams.push(10); //offset
    inParams.push(5);  //limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'search', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
});
```

### Count records

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([['is_company', '=', true],['customer', '=', true]]);
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'search_count', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
});
```

### Read records

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([['is_company', '=', true],['customer', '=', true]]);
    inParams.push(0);  //offset
    inParams.push(1);  //Limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'search', params, function (err, value) {
        if (err) { return console.log(err); }
        var inParams = [];
        inParams.push(value); //ids
        var params = [];
        params.push(inParams);
        odoo.execute_kw('res.partner', 'read', params, function (err2, value2) {
            if (err2) { return console.log(err2); }
            console.log('Result: ', value2);
        });
    });
});
```

### Read records filtered by fields

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([['is_company', '=', true],['customer', '=', true]]);
    inParams.push(0);  //offset
    inParams.push(1);  //Limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'search', params, function (err, value) {
        if (err) { return console.log(err); }
        var inParams = [];
        inParams.push(value); //ids
        inParams.push(['name', 'country_id', 'comment']); //fields
        var params = [];
        params.push(inParams);
        odoo.execute_kw('res.partner', 'read', params, function (err2, value2) {
            if (err2) { return console.log(err2); }
            console.log('Result: ', value2);
        });
    });
});
```

### Listing record fields

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([]);
    inParams.push([]);
    inParams.push([]);
    inParams.push(['string', 'help', 'type']);  //attributes
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'fields_get', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
});
```

### Search and read

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([['is_company', '=', true],['customer', '=', true]]);
    inParams.push(['name', 'country_id', 'comment']); //fields
    inParams.push(0); //offset
    inParams.push(5); //limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'search_read', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
});
```

### Create records

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push({'name': 'FFNew Partner'})
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'create', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
});
```

### Update records

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([3626]); //id to update
    inParams.push({'name': 'NewFF Partner'})
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'write', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
});
```

### Delete records

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([3626]); //id to delete
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'unlink', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
});
```

### Inspection and introspection (ir.model)

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push({'name': 'Custom Model',
        'model': 'x_custom_model',
        'state': 'manual'
    });
    var params = [];
    params.push(inParams);
    odoo.execute_kw('ir.model', 'create', params, function (err, value) {
        if (err) { return console.log(err); }
        var inParams = [];
        inParams.push([]);
        inParams.push([]);
        inParams.push([]);
        inParams.push(['string', 'help', 'type']);  //attributes
        var params = [];
        params.push(inParams);
        odoo.execute_kw('x_custom_model', 'fields_get', params, function (err2, value2) {
            if (err2) { return console.log(err2); }
            console.log('Result: ', value2);
        });
        console.log('Result: ', value);
    });
});
```

### Inspection and introspection (ir.model.fields)

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push({
        'name': 'Custom Model',
        'model': 'x_custom',
        'state': 'manual'
    });
    var params = [];
    params.push(inParams);
    odoo.execute_kw('ir.model', 'create', params, function (err, value) {
        if (err) { return console.log(err); }
        var inParams = [];
        inParams.push({
            'model_id': value,
            'name': 'x_name',
            'ttype': 'char',
            'state': 'manual',
            'required': true,
        });
        var params = [];
        params.push(inParams);
        odoo.execute_kw('ir.model.fields', 'create', params, function (err2, value2) {
            if (err) { return console.log(err); }
            var inParams = [];
            inParams.push({
                'x_name': 'test record'
            });
            var params = [];
            params.push(inParams);
            odoo.execute_kw('x_custom', 'create', params, function (err3, value3) {
                if (err3) { return console.log(err3); }
                var inParams = [];
                inParams.push([value3])
                var params = [];
                params.push(inParams);
                odoo.execute_kw('x_custom', 'read', params, function (err4, value4) {
                    if (err4) { return console.log(err4); }
                    console.log('Result: ' + value4);
                });
            });
        });
    });
});
```

### Workflow manipulations

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([['customer', '=', true]]);
    inParams.push([
        'property_account_receivable',
        'property_payment_term',
        'property_account_position']); //fields
    inParams.push(0); //offset
    inParams.push(1); //limit
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'search_read', params, function (err, value) {
        if (err) { return console.log(err); }
        var inParams = [];
        inParams.push({
            'partner_id': value[0]['id'],
            'account_id': value[0]['property_account_receivable'][0],
            'invoice_line': [0, False, {'name': "AAA"}]
        });
        var params = [];
        params.push(inParams);
        odoo.execute_kw('account.invoice', 'create', params, function (err2, value2) {
            if (err2) { return console.log(err2); }
            var params = [];
            params.push(value2);
            odoo.exec_workflow('account.invoice', 'invoice_open', params, function (err3, value3) {
                if (err3) { return console.log(err3); }
                console.log('Result: ' + value3);
            });
        });
    });
});
```

### Report printing

```js
odoo.connect(function (err) {
    if (err) { return console.log(err); }
    console.log('Connected to Odoo server.');
    var inParams = [];
    inParams.push([['type', '=', 'out_invoice'], ['state', '=', 'open']]);
    var params = [];
    params.push(inParams);
    odoo.execute_kw('account.invoice', 'search', params, function (err, value) {
        if (err) { return console.log(err); }
        if(value){
            var params = [];
            params.push(value);
            odoo.render_report('account.report_invoice', params, function (err2, value2) {
                if (err2) { return console.log(err2); }
                console.log('Result: ' + value2);
            });
        }
    });
});
```

## Reference

* [Odoo Technical Documentation](https://www.odoo.com/documentation/8.0)
* [Odoo Web Service API](https://www.odoo.com/documentation/8.0/api_integration.html)

## License

Copyright 2016 Qazi Faisla Sami

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
