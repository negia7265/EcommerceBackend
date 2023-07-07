const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAutherization,
  verifyTokenAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//Create
router.post("/cart", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update
router.put("/cart/:id", verifyTokenAndAutherization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete
router.delete("/cart/:id", async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get All
router.get("/cart", async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
