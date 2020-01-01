// const categoryModel = require('../models/category.model');

// module.exports = function (app) {
//   app.use(async (req, res, next) => {
//     const rows = await categoryModel.allWithDetails();
//     res.locals.lcCategories = rows;

//     if (typeof (req.session.isAuthenticated) === 'undefined') {
//       req.session.isAuthenticated = false;
//     }
//     res.locals.isAuthenticated = req.session.isAuthenticated;
//     res.locals.authUser = req.session.authUser;

//     next();
//   })
// };

// module.exports = async (req, res, next) => {
//   const rows = await categoryModel.allWithDetails();
//   res.locals.lcCategories = rows;
//   next();
// }

