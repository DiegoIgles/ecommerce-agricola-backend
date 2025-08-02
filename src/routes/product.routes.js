const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct } = require("../controllers/product.controller");
const upload = require("../utils/multer");
const { uploadProductImage } = require("../controllers/product.controller");
router.get("/", getAllProducts);
router.post("/", createProduct);
router.post("/:id/image", upload.single("image"), uploadProductImage);

module.exports = router;
