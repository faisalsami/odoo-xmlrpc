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
    inParams.push('read');
    inParams.push(false); //raise_exception
    var params = [];
    params.push(inParams);
    odoo.execute_kw('res.partner', 'check_access_rights', params, function (err, value) {
        if (err) { return console.log(err); }
        console.log('Result: ', value);
    });
});