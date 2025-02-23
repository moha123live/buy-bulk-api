const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes');

router.use('/auth',authRoutes);
router.use('/products', productRoutes);

module.exports = router;