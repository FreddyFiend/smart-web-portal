const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      username: user.username,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = generateToken;
