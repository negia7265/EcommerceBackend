const router = require("express").Router();
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAutherization,
  verifyTokenAdmin,
} = require("./verifyToken");
const Router = require("express").Router();
//Update
router.put("/:id", verifyTokenAndAutherization, async (req, res) => {
  if (req.body.password) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//Delete
router.delete("/:id", verifyTokenAndAutherization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//get user
router.get("/find/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all users
router.get("/find", verifyTokenAdmin, async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get latest user entries
router.get("/find", verifyTokenAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const user = query
      ? await User.find({}).sort({ _id: -1 }).limit(5)
      : await User.find({});

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get user stats
router.get("/stats", verifyTokenAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([]);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
