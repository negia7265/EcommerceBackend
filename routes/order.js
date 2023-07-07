const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAutherization,
  verifyTokenAdmin,
} = require("./verifyToken");
const router = require("express").Router();
//Create
router.post("/order", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Update
router.put("/order/:id", verifyTokenAndAutherization, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Delete
router.delete("/order/:id", async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get All
router.get("/order", async (req, res) => {
  try {
    const Orders = await Order.find({});
    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
