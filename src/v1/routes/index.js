const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes');
const messageRoutes = require('./messageRoutes');

router.use('/auth',authRoutes);
router.use('/products', productRoutes);
router.use('/messages', messageRoutes);

module.exports = router;