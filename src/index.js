const express = require("express");
const cors = require('cors');

const { AppDataSource } = require("./database/data-source");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const categoryRoutes = require("./routes/category.routes");

require("dotenv").config();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5000;

AppDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => console.error("Error al conectar:", err));

app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
