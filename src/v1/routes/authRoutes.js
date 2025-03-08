const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateLoginInput, validateRegisterInput, validateChangePassword } = require("../validators/authValidators");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/login", validateLoginInput, authController.login);
router.post("/register", validateRegisterInput, authController.register);
router.post("/changePassword", authenticateToken, validateChangePassword, authController.changePassword);

module.exports = router;