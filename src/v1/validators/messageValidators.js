const { body, param, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/responseUtils");

const validateMessage = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("msg").trim().notEmpty().withMessage("Message is required"),
    handleValidationResult
];

const validateMessageId = [
    param("id").notEmpty().withMessage("Message ID is required").isLength({ max: 36 }).withMessage("Message ID cannot exceed 36 characters"),
    handleValidationResult
];

function handleValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array()[0].msg, STATUS_CODES.BAD_REQUEST);
    }
    next();
}

module.exports = {
    validateMessage,
    validateMessageId
};