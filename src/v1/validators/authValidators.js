const { body, validationResult } = require("express-validator");
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

const validateChangePassword = [
    body("old_password").notEmpty().withMessage("Old password is required").isLength({ max: 16 }).withMessage("Old Password must be 16 characters or less"),
    body("password").notEmpty().withMessage("New password is required").isLength({ max: 16 }).withMessage("New Password must be 16 characters or less"),
    body("confirm_password").notEmpty().withMessage("Confirm password is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        }),
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
    validateLoginInput,
    validateRegisterInput,
    validateChangePassword
};
