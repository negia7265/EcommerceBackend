const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user.js");
const authRoute = require("./routes/auth.js");
const productRoute = require("./routes/product.js");
const cartRoute = require("./routes/cart.js");
const orderRoute = require("./routes/order.js");
const paymentRoute = require("./routes/stripe.js");
const dotenv = require("dotenv");
dotenv.config();
mongoose.set("strictQuery", false);
const uri = process.env.MONGO_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(uri, options)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));
app.use(cors());
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", authRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", orderRoute);
app.use("/api", paymentRoute);
app.get("/", (req, res) => {
  res.send("It works!!");
});
app.listen(5000, (req, res) => {
  console.log("Serving on port 5000");
});
