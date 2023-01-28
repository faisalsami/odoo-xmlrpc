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

    const companies = await odoo.execute_kw({
      model: "res.partner",
      method: "fields_get",
      params: [[[[], [], [], ["string"]]]],
    });

    console.log("Result: ", companies);
  } catch (err) {
    console.log(err);
  }
})();
