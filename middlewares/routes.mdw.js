const restrict = require('../middlewares/auth.mdw');

module.exports = function(app) {
  app.use('/', require('../routes/home.route'));
  app.use("/account", require("./../routes/account.route"));
  app.use("/store", require("./../routes/store.route"));
  
  // app.use('/categories', require('../routes/category.route'));
  app.use('/products', require('../routes/products.route'));
  // app.use('/admin/categories', restrict, require('../routes/admin/category.route'));
};
