const express = require("express");
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();
const productController = require("../controllers/productController");
const { validateProductId, validateProduct } = require('../validators/productValidators');
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/", authenticateToken, upload.single('image'), validateProduct, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", authenticateToken, validateProductId, productController.getProductById);
router.put("/:id", authenticateToken, validateProductId, validateProduct, productController.updateProduct);
router.delete("/:id", authenticateToken, validateProductId, productController.deleteProduct);

module.exports = router;