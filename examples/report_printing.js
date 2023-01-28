import OdooModule from "../dist/index.js"; // use 'odoo-xmlrpc-promise' in your project";

// @ts-ignore file
const Odoo = OdooModule.default;

var odoo = new Odoo({
  url: "<insert server URL>",
  //port: '<insert server port default 80>',
  db: "<insert db name>",
  username: "<insert username>",
  password: "<insert password>",
});

(async () => {
  try {
    const uid = await odoo.connect();
    console.log("Connected to Odoo server. Uid: ", uid);

    const invoiceIds = await odoo.execute_kw({
      model: "account.move", //Since Odoo 13, account.invoice has been replaced by account.move
      method: "search",
      params: [[[["move_type", "=", "in_invoice"]]]],
    });

    console.log("invoiceIds: ", invoiceIds);

    const [reportId] = await odoo.execute_kw({
      model: "ir.actions.report",
      method: "search",
      params: [[[["report_type", "=", "qweb-pdf"]]]],
    });

    // I don't find the action to get pdf in doc
  } catch (err) {
    console.log(err);
  }
})();
