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