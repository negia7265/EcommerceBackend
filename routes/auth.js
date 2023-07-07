const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    // password: CryptoJS.AES.encrypt(
    //   req.body.password,
    //   process.env.PASS_SEC
    // ).toString(),
  });
  try {
    const temp = await newUser.save();
    res.json(temp);
  } catch (err) {
    console.log(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    //!user && res.status(401).json("Wrong Credentials");
    if (!user) {
      return res.json("Wrong Credentials");
    }
    // const hashpassword = CryptoJS.AES.decrypt(
    //   user.password,
    //   process.env.PASS_SEC
    // );
    // const password = hashpassword.toString();
    const password = user.password;
    console.log(password);
    if (password !== req.body.password) {
      return res.status(401).json("Wrong Credential");
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "70d" }
    );
    res.json({ user, accessToken });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
