const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAutherization,
  verifyTokenAdmin,
} = require("./verifyToken");
const router = require("express").Router();

//Create
router.post("/product", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
  }
});
//Delete
router.delete("/product/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get Product
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { password, ...others } = product._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get all products
router.get("/allproducts", async (req, res) => {
  try {
    const user = await Product.find({});
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/products/all", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await Product.find({}).sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find({});
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
