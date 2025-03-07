const express = require("express");
const router = express.Router();
const settingController = require("../controllers/settingController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const { validateSetting, validateSettingId } = require('../validators/settingValidators');

router.get("/", authenticateToken, settingController.getSettings);
router.patch("/:id", authenticateToken, validateSettingId, validateSetting, settingController.updateSetting);

module.exports = router;