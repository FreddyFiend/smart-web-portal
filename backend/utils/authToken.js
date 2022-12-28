const jwt = require("jsonwebtoken");
const authToken = (previliges) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log(err);
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
