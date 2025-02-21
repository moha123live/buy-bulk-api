const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { validateProductId, validateProduct } = require('../validators/productValidators')


router.post("/", validateProduct, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", validateProductId, productController.getProductById);
router.put("/:id", validateProductId, validateProduct, productController.updateProduct);
router.delete("/:id", validateProductId, productController.deleteProduct);


module.exports = router;