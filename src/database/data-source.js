const { DataSource } = require("typeorm");
const { Product } = require("../entity/Product");
const { Cart } = require("../entity/Cart");
const { CartItem } = require("../entity/CartItem");
const { Order } = require("../entity/Order");
const { OrderItem } = require("../entity/OrderItem");
const { Category } = require("../entity/Category");

require("dotenv").config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [Product, Cart, CartItem, Order, OrderItem, Category],
});


module.exports = { AppDataSource };
