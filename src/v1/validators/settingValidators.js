const { body, param, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/responseUtils");

const validateSetting = [
    body("logo_name").notEmpty().withMessage("Logo name is required").isLength({ max: 50 }).withMessage("Logo name must be within 50 characters"),
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("place").optional().isLength({ max: 100 }).withMessage("Place must be within 100 characters"),
    body("fb").optional().isURL().withMessage("Invalid Facebook URL"),
    body("twitter").optional().isURL().withMessage("Invalid Twitter URL"),
    body("linked_in").optional().isURL().withMessage("Invalid LinkedIn URL"),
    body("insta").optional().isURL().withMessage("Invalid Instagram URL"),
    body("location").notEmpty().withMessage("Location is required"),
    body("contact_phone")
        .notEmpty().withMessage("Contact phone is required")
        .matches(/^[+\d\s]+$/).withMessage("Invalid phone number format")
        .isLength({ min: 10, max: 15 }).withMessage("Invalid phone number digits"),
    body("contact_email").notEmpty().withMessage("Contact email is required").isEmail().withMessage("Invalid email format"),
    handleValidationResult
];

const validateSettingId = [
    param("id").notEmpty().withMessage("Setting ID is required").isLength({ max: 36 }).withMessage("Setting ID cannot exceed 36 characters"),
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
    validateSetting,
    validateSettingId
};