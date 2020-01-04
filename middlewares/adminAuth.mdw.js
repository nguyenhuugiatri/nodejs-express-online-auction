const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (
    req.headers &&
    req.headers.authorization &&
    String(req.headers.authorization.split(" ")[0]).toLowerCase() === "bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "anhem1nha", (err, decode) => {
      if (err)
        return res.status(403).send({
          message: "Token invalid"
        });
      else return next();
    });
  }else{
    return res.status(403).send({
      message:'Unauthorized'
    });
  }
};
