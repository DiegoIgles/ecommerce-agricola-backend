const express = require("express");
const router = express.Router();
const { createCart, addToCart, getCart, removeFromCart } = require("../controllers/cart.controller");

router.post("/", createCart);
router.post("/:cartId/add", addToCart);
router.get("/:cartId", getCart);
router.delete("/:cartId/remove/:itemId", removeFromCart);

module.exports = router;
