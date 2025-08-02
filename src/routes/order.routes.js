const express = require("express");
const router = express.Router();
const { createOrderFromCart, getOrderById, payOrder } = require("../controllers/order.controller");

router.post("/from-cart/:cartId", createOrderFromCart);
router.get("/:orderId", getOrderById);
router.post("/:orderId/pay", payOrder);

module.exports = router;
