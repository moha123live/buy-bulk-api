const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { validateMessageId, validateMessage } = require('../validators/messageValidators');
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/", validateMessage, messageController.createMessage);
router.get("/", authenticateToken, messageController.getAllMessages);
router.delete("/:id", authenticateToken, validateMessageId, messageController.deleteMessage);

module.exports = router;