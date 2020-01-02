module.exports = (req, res, next) => {
  if (!req.session.user)
    return res.redirect(`/account/signin?retUrl=${req.originalUrl}`);
  return next();
}
