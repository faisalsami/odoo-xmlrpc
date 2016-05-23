var Odoo = require('../lib/index');

var odoo = new Odoo({
    url: '<insert server URL>',
    port: '<insert server port default 80>',
    db: '<insert database name>',
    username: '<insert username>',
    password: '<insert password>'
});

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