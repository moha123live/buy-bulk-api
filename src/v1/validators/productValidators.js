const { body, param, validationResult } = require("express-validator");
const { errorResponse } = require("../utils/responseUtils");

const validateProduct = [
    body("name").trim().notEmpty().withMessage("Product name is required"),
    body("name").trim().isLength({ min: 1, max: 100 }).withMessage("Product name must be maximum 100 characters only"),
    body("selling_price").trim().notEmpty().withMessage("Selling Price is required"),
    body("selling_price").trim().isLength({ min: 1, max: 20 }).withMessage("Selling price must be maximum 20 characters only"),
    body("market_price").trim().notEmpty().withMessage("Market Price is required"),
    body("market_price").trim().isLength({ min: 1, max: 20 }).withMessage("Market price must be maximum 20 characters only"),
    body("stock").trim().notEmpty().withMessage("Stock is required"),
    (req, res, next) => {
        if (req.file) {
            if (!req.file.mimetype.startsWith("image/")) {
                return errorResponse(res, "Only image files are allowed.", STATUS_CODES.BAD_REQUEST);
            }
            if (req.file.size > 5 * 1024 * 1024) {
                return errorResponse(res, "File size should not exceed 5MB.", STATUS_CODES.BAD_REQUEST);
            }
        }
        next();
    },
    handleValidationResult
];

const validateProductId = [
    param("id").notEmpty().withMessage("Product ID is required").isLength({ max: 36 }).withMessage("Product ID cannot exceed 36 characters"),
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
    validateProduct,
    validateProductId
};