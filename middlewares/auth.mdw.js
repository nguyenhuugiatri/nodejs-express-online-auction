module.exports = (req, res, next) => {
  if (req.session.isAuthenticated === false)
    return res.redirect(`/account/login?retUrl=${req.originalUrl}`);

  next();
}
