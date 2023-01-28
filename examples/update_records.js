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

    const result = await odoo.execute_kw({
      model: "res.partner",
      method: "write",
      params: [[238, { name: "New Partner Updated" }]],
    });

    console.log("Result: ", result);
  } catch (err) {
    console.log(err);
  }
})();
