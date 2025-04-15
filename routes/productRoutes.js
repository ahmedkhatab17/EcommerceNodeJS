const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllProducts); // Public route
router.post("/", protect, adminOnly, createProduct); // Admin only
router.put("/:id", protect, adminOnly, updateProduct); // Admin only
router.delete("/:id", protect, adminOnly, deleteProduct); // Admin only

module.exports = router;
