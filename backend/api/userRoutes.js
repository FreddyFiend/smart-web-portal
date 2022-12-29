const express = require("express");
const generateToken = require("../utils/generateToken.js");
const authToken = require("../utils/authToken.js");
const User = require("./userModel.js");
const bcrypt = require("bcrypt");

const userRouter = express.Router();

userRouter.get("/check", authToken(), async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  res.status(200).json({
    email: user.email,
    username: user.username,
    phone: user.phone,
    user: req.user,
    success: true,
  });
});

userRouter.get("/getdetails", authToken(), async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  res.status(200).json({
    email: user.email,
    username: user.username,
    phone: user.phone,
    user: req.user,
    success: true,
  });
});

userRouter.post("/signin", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        email: user.email,
        username: user.username,
        token: generateToken(user),
        msg: "Logged in succesfully",
        success: true,
      });
      return;
    }
  }
  res.status(401).send({ msg: "Invalid email or password", success: false });
});

userRouter.post("/signup", async (req, res, next) => {
  let { email, username, password, key } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    return res.json({ msg: "Email already registered", success: false });
  }
  let roles = ["user"];
  if (key === "thegrandgateofgreatgarrison") {
    roles = ["user", "admin"];
  }

  const user = new User({
    username,
    email,
    roles,
    password: bcrypt.hashSync(password, 8),
  });

  user.save().then((docs, err) => {
    if (err) {
      return res.json("something went wrong");
    }

    return res.send({
      _id: docs._id,
      username: user.username,
      email: docs.email,
      token: generateToken(docs),
      msg: "Account created succesfully",
      success: true,
    });
  });
});

userRouter.put("/:id", authToken(["admin"]), async (req, res) => {
  let { roles } = req.body;

  const updatedUser = await User.findByIdAndUpdate(req.params.id, { roles });
  res.status(202).json({ msg: "Succesfully updated roles!", updatedUser });
});

module.exports = userRouter;
