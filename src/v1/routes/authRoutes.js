const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validateLoginInput, validateRegisterInput } = require("../validators/authValidators");

router.post("/login", validateLoginInput, authController.login);
router.post("/register", validateRegisterInput, authController.register);

module.exports = router;