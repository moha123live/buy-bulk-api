const { body, param, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/responseUtils");

const validateLoginInput = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
    handleValidationResult
];

const validateRegisterInput = [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at least 4 characters long"),
    body("name").notEmpty().withMessage("Name is required").isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),
    body("phoneNumber").optional().isMobilePhone().withMessage("Invalid phone number").isLength({ max: 10 }).withMessage("Phone number cannot exceed 10 characters"),
    handleValidationResult
];

function handleValidationResult(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorResponse(res, errors.array()[0].msg, STATUS_CODES.BAD_REQUEST);
    }
    next();
};

module.exports = {
    validateLoginInput,
    validateRegisterInput
};