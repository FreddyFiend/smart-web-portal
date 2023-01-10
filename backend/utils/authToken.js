const jwt = require("jsonwebtoken");
const authToken = (previliges) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (authHeader == undefined)
      return res.status(401).json({ success: false, msg: "Please login" });

    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      res.status(401).json({ success: false, msg: "Please Login" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      if (previliges !== undefined) {
        for (i = 0; i < user.roles.length; i++) {
          if (previliges.includes(user.roles[i])) {
            req.user = user;
            next();
            return;
          }
        }
      } else {
        next();
        return;
      }

      res.status(401).json({ success: false, msg: "unauthorized user" });
    });
  };
};

module.exports = authToken;
