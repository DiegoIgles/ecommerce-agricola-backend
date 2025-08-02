const express = require("express");
const router = express.Router();
const { createCategory, getCategories } = require("../controllers/category.controller");
const upload = require("../utils/multer");
const { uploadCategoryImage } = require("../controllers/category.controller");

router.post("/", createCategory);
router.get("/", getCategories);
router.post("/:id/image", upload.single("image"), uploadCategoryImage);

module.exports = router;
