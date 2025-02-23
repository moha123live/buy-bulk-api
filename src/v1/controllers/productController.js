const productService = require("../services/productService");
const { successResponse, errorResponse } = require("../utils/responseUtils");
const { sequelize } = require("../../../config/database");
const { indianDateAndTime } = require("../utils/commonUtils");


const createProduct = async (req, res) => {
    let transaction;
    const { body: data } = req;
    try {
        transaction = await sequelize.transaction();
        const { ...productData }  = await productService.createProduct(data, transaction);
        delete productData.createdAt; 
        await transaction.commit();
        return successResponse(res, productData, "Product " + MESSAGES.CREATED, STATUS_CODES.CREATED);
    } catch (error) {
        if (transaction && !transaction.finished) await transaction.rollback();
        return errorResponse(res, `Create product error ${error.message}`, STATUS_CODES.BAD_REQUEST);
    }
};

const getAllProducts = async (req, res) => {
    const exclude = ["createdAt"];
    try {
        const products = await productService.getAllProducts(exclude);
        const productsData = products.map(product => {
            const { ...productData } = product.toJSON();
            productData.updatedAt = indianDateAndTime(productData.updatedAt);
            return productData;
        });
        return successResponse(res, productsData);
    } catch (error) {
        return errorResponse(res, `Get all products error ${error.message}`, STATUS_CODES.BAD_REQUEST);
    }
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    const exclude = ["createdAt"];
    try {
        const product = await productService.getProductById(id, exclude);
        if (!product) throw new Error("Product not found");
        const { ...productData } = product;
        return successResponse(res, productData);
    } catch (error) {
        return errorResponse(res, `Get single product error ${error.message}`, STATUS_CODES.NOT_FOUND);
    }
};

const updateProduct = async (req, res) => {
    let transaction;
    const { body } = req;
    const id = req.params.id;
    const exclude = ["createdAt"];
    try {
        transaction = await sequelize.transaction();
        const { ...productData } = await productService.updateProduct(id, body, transaction, exclude);
        await transaction.commit();
        return successResponse(res, productData);
    } catch (error) {
        if (transaction && !transaction.finished) await transaction.rollback();
        return errorResponse(res, `Update product error ${error.message}`, STATUS_CODES.BAD_REQUEST);
    }
};

const deleteProduct = async (req, res) => {
    let transaction;
    const id = req.params.id;
    try {
        transaction = await sequelize.transaction();
        await productService.deleteProduct(id, transaction);
        await transaction.commit();
        return successResponse(res, null, "Product deleted successfully");
    } catch (error) {
        if (transaction && !transaction.finished) await transaction.rollback();
        return errorResponse(res, error.message, STATUS_CODES.BAD_REQUEST);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};