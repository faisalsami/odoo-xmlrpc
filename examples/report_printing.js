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