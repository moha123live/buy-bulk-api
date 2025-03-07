const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const messageRoutes = require('./messageRoutes');
const settingRoutes = require('./settingRoutes');
const authRoutes = require('./authRoutes');

router.use('/auth',authRoutes);
router.use('/products', productRoutes);
router.use('/messages', messageRoutes);
router.use('/settings', settingRoutes);

module.exports = router;